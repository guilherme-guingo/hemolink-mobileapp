import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Modal, FlatList, TouchableOpacity, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { Button } from '../../components/Button';
import { DadosDoador } from '../../components/DadosDoador';
import { HospitalPicker } from '../../components/HospitalPicker';
import { useAuth } from '../../contexts/AuthContext';
import { enviarRegistro } from '../../services/RegistroService';
import { jaEnviou, marcarComoEnviado } from '../../util/bloqueioEnvio';
import { theme } from '../../theme';
import { styles } from './style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParametrosRotasAuth } from '../../routers/navigation';

const TIPOS_SANGUINEOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export function PedidoForm(): React.JSX.Element {
  type NavegacaoProps = NativeStackNavigationProp<ParametrosRotasAuth>;
  const navigation = useNavigation<NavegacaoProps>();
  const { user } = useAuth();

  const [hospitalId, setHospitalId] = useState('');
  const [bloqueado, setBloqueado] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [tipoSanguineo, setTipoSanguineo] = useState(user?.tipoSanguineo ?? '');
  const [showTipoPicker, setShowTipoPicker] = useState(false);

  useEffect(() => {
    if (!user?.cpf) { setVerificando(false); return; }
    jaEnviou(user.cpf, 'pedido')
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
        tipoSanguineo,
        tipoRegistro: 'pedido',
        unidadeId: hospitalId,
        dataPedido: new Date().toISOString(),
        ultimaDoacao: '',
        horario: '',
        criadoEm: new Date().toISOString(),
      });
      await marcarComoEnviado(user.cpf, 'pedido');
      Toast.show({ type: 'success', text1: 'Pedido registrado!', text2: 'Em breve a unidade entrará em contato.' });
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
      <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Você já registrou um pedido</Text>
      <Text style={{ color: theme.colors.textMuted }}>Aguarde o contato da unidade.</Text>
      <Button texto="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );

  return (
    <>
      <AuthFormWrapper
        title="Solicitar Doação"
        subtitle="Confirme seus dados antes de enviar"
        buttonText="Enviar pedido"
        isLoading={enviando}
        onSubmit={handleEnviar}
      >
        <Text style={styles.sectionLabel}>Seus dados</Text>
        <DadosDoador
          nome={user?.nome ?? ''}
          cpf={user?.cpf ?? ''}
          tipoSanguineo={tipoSanguineo}
          onPressTipo={() => setShowTipoPicker(true)}
        />

        <Text style={styles.sectionLabel}>Unidade</Text>
        <HospitalPicker value={hospitalId} onChange={setHospitalId} />

        <Text style={styles.sectionLabel}>Data do pedido</Text>
        <View style={styles.dataBox}>
          <Ionicons name="calendar-outline" size={18} color={theme.colors.primary} />
          <Text style={styles.dataTexto}>{new Date().toLocaleDateString('pt-BR')}</Text>
        </View>
      </AuthFormWrapper>

      <Modal visible={showTipoPicker} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowTipoPicker(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Tipo Sanguíneo</Text>
            <FlatList
              data={TIPOS_SANGUINEOS}
              keyExtractor={(item) => item}
              numColumns={2}
              columnWrapperStyle={{ gap: 10 }}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => {
                const ativo = tipoSanguineo === item;
                return (
                  <TouchableOpacity
                    style={[styles.tipoItem, ativo && styles.tipoItemAtivo]}
                    onPress={() => { setTipoSanguineo(item); setShowTipoPicker(false); }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.tipoItemTexto, ativo && styles.tipoItemTextoAtivo]}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
