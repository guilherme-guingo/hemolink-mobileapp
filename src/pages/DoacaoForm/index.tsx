import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParametrosRotasApp } from '../../routers/navigation';

import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { Button } from '../../components/Button';
import { HospitalPicker } from '../../components/HospitalPicker';
import { useAuth } from '../../contexts/AuthContext';
import { enviarRegistro } from '../../services/RegistroService';
import { jaEnviou, marcarComoEnviado, limparBloqueios } from '../../util/bloqueioEnvio';
import { theme } from '../../theme';

export function DoacaoForm(): React.JSX.Element {
  type NavegacaoProps = NativeStackNavigationProp<ParametrosRotasApp>;
  const navigation = useNavigation<NavegacaoProps>();
  const { user } = useAuth();

  const [hospitalId, setHospitalId] = useState('');
  const [ultimaDoacao, setUltimaDoacao] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!user?.cpf) { setVerificando(false); return; }
    jaEnviou(user.cpf, 'doacao')
      .then(setBloqueado)
      .finally(() => setVerificando(false));
  }, []);

  async function handleEnviar() {
    if (!user || !hospitalId) {
      Toast.show({ type: 'error', text1: 'Selecione uma unidade' });
      return;
    }
    setEnviando(true);
    try {
      await enviarRegistro({
        nome: user.nome,
        cpf: user.cpf,
        tipoSanguineo: user.tipoSanguineo,
        tipoRegistro: 'doacao',
        unidadeId: hospitalId,
        ultimaDoacao: ultimaDoacao.toISOString(),
        criadoEm: new Date().toISOString(),
      });
      await marcarComoEnviado(user.cpf, 'doacao');
      Toast.show({ type: 'success', text1: 'Doação registrada!', text2: `Obrigado, ${user.nome.split(' ')[0]}!` });
      navigation.goBack();
    } catch {
      Toast.show({ type: 'error', text1: 'Erro ao enviar', text2: 'Tente novamente.' });
    } finally {
      setEnviando(false);
    }
  }

  if (verificando) return <ActivityIndicator style={{ flex: 1 }} color={theme.colors.primary} />;

  if (bloqueado) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Você já registrou uma doação 🩸</Text>
      <Text style={{ color: theme.colors.textMuted }}>Obrigado por contribuir!</Text>
      <Button texto="Voltar" onPress={() => navigation.goBack()} />
      <Button
        texto="Resetar (apenas teste)"
        onPress={async () => { if (user?.cpf) { await limparBloqueios(user.cpf); setBloqueado(false); } }}
        bg={theme.colors.background}
        color={theme.colors.textMuted}
      />
    </View>
  );

  return (
    <AuthFormWrapper title="Quero doar" subtitle="Preencha os dados abaixo" buttonText="Enviar doação" isLoading={enviando} onSubmit={handleEnviar}>

      <Text style={{ fontWeight: '600', marginTop: 16, marginBottom: 6 }}>Última doação</Text>
      <TouchableOpacity
        onPress={() => setMostrarPicker(true)}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, padding: 14 }}
      >
        <Text>{ultimaDoacao.toLocaleDateString('pt-BR')}</Text>
        <Ionicons name="calendar-outline" size={18} color={theme.colors.textMuted} />
      </TouchableOpacity>
      {mostrarPicker && (
        <DateTimePicker
          value={ultimaDoacao}
          mode="date"
          maximumDate={new Date()}
          onChange={(_, date) => { setMostrarPicker(false); if (date) setUltimaDoacao(date); }}
        />
      )}

      <Text style={{ fontWeight: '600', marginTop: 16, marginBottom: 6 }}>Unidade</Text>
      <HospitalPicker value={hospitalId} onChange={setHospitalId} />

    </AuthFormWrapper>
  );
}
