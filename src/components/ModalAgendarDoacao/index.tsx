import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../../theme';
import { Button } from '../Button';
import { DadosDoador } from '../DadosDoador';
import { useAuth } from '../../contexts/AuthContext';
import { enviarRegistro } from '../../services/RegistroService';
import { jaEnviou, marcarComoEnviado } from '../../util/bloqueioEnvio';
import { Hospital, listarHospitais } from '../../services/HospitalService';
import Toast from 'react-native-toast-message';
import { styles } from './style';

interface Props {
  visible: boolean;
  onClose: () => void;
  hospitalId?: string;
  hospitalNome?: string;
}

const HORARIOS = ['10:00', '12:00', '14:00', '16:00'];

export const ModalAgendarDoacao = ({ visible, onClose, hospitalId, hospitalNome }: Props) => {
  const { user } = useAuth();

  const modoPickerHospital = !hospitalId || !hospitalNome;

  const [data, setData] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [loadingHospitais, setLoadingHospitais] = useState(false);
  const [hospitalSelecionadoId, setHospitalSelecionadoId] = useState('');

  useEffect(() => {
    if (visible && modoPickerHospital) {
      setLoadingHospitais(true);
      listarHospitais()
        .then(res => {
          const lista: Hospital[] = res.data;
          setHospitais(lista);
          if (lista.length > 0) setHospitalSelecionadoId(lista[0].id);
        })
        .catch(() => Toast.show({ type: 'error', text1: 'Erro ao carregar unidades' }))
        .finally(() => setLoadingHospitais(false));
    }
  }, [visible]);

  const idFinal = modoPickerHospital ? hospitalSelecionadoId : hospitalId!;

  const dataFormatada = data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleConfirmar = async () => {
    if (!horarioSelecionado) {
      Toast.show({ type: 'error', text1: 'Selecione um horário' });
      return;
    }
    if (!user) {
      Toast.show({ type: 'error', text1: 'Usuário não encontrado' });
      return;
    }
    if (!idFinal) {
      Toast.show({ type: 'error', text1: 'Selecione um hospital' });
      return;
    }

    const bloqueado = await jaEnviou(user.cpf, 'doacao');
    if (bloqueado) {
      Toast.show({ type: 'error', text1: 'Você já tem uma doação agendada', text2: 'Aguarde o prazo antes de agendar novamente.' });
      return;
    }

    setEnviando(true);
    try {
      const dataAgendamento = new Date(data);
      const [hora, minuto] = horarioSelecionado.split(':');
      dataAgendamento.setHours(Number(hora), Number(minuto), 0, 0);

      await enviarRegistro({
        nome: user.nome,
        cpf: user.cpf,
        tipoSanguineo: user.tipoSanguineo,
        tipoRegistro: 'doacao',
        unidadeId: idFinal,
        ultimaDoacao: dataAgendamento.toISOString(),
        horario: horarioSelecionado,
        dataPedido: '',
        criadoEm: new Date().toISOString(),
      });

      await marcarComoEnviado(user.cpf, 'doacao');
      Toast.show({ type: 'success', text1: 'Doação agendada!', text2: `${dataFormatada} às ${horarioSelecionado}` });
      setHorarioSelecionado(null);
      onClose();
    } catch {
      Toast.show({ type: 'error', text1: 'Erro ao agendar', text2: 'Tente novamente.' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.fundo}>
        <View style={styles.modal}>

          <View style={styles.header}>
            <Text style={styles.titulo}>Agendar Doação</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={24} color="#5C5F60" />
            </Pressable>
          </View>

          <View style={styles.divisor} />

          <ScrollView showsVerticalScrollIndicator={false}>
            
            {!modoPickerHospital && (
              <View style={styles.hospitalBox}>
                <Ionicons name="location-sharp" size={16} color={theme.colors.primary} />
                <Text style={styles.hospitalNome} numberOfLines={1}>{hospitalNome}</Text>
              </View>
            )}
            
            {modoPickerHospital && (
              <View style={styles.secaoHospital}>
                <Text style={styles.sectionLabel}>Unidade de saúde</Text>
                {loadingHospitais ? (
                  <ActivityIndicator color={theme.colors.primary} style={{ marginBottom: 20 }} />
                ) : (
                  <View style={styles.pickerContainer}>
                    <Ionicons name="location-sharp" size={16} color={theme.colors.primary} style={styles.pickerIcone} />
                    <Picker
                      selectedValue={hospitalSelecionadoId}
                      onValueChange={(itemValue) => setHospitalSelecionadoId(itemValue)}
                      style={styles.picker}
                    >
                      {hospitais.map(h => (
                        <Picker.Item key={h.id} label={`${h.name} - ${h.city}`} value={h.id} />
                      ))}
                    </Picker>
                  </View>
                )}
              </View>
            )}

            <Text style={styles.sectionLabel}>Seus dados</Text>
            <DadosDoador
              nome={user?.nome ?? ''}
              cpf={user?.cpf ?? ''}
              tipoSanguineo={user?.tipoSanguineo ?? ''}
            />

            <Text style={styles.sectionLabel}>Data da doação</Text>
            <TouchableOpacity style={styles.dataBox} onPress={() => setMostrarPicker(true)} activeOpacity={0.7}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.dataTexto}>{dataFormatada}</Text>
            </TouchableOpacity>

            {mostrarPicker && (
              <DateTimePicker
                value={data}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={new Date()}
                onChange={(_, dataSelecionada) => {
                  setMostrarPicker(Platform.OS === 'ios');
                  if (dataSelecionada) setData(dataSelecionada);
                }}
                locale="pt-BR"
              />
            )}

            <Text style={styles.sectionLabel}>Horário</Text>
            <View style={styles.horariosGrid}>
              {HORARIOS.map((h) => {
                const ativo = horarioSelecionado === h;
                return (
                  <TouchableOpacity
                    key={h}
                    style={[styles.horarioItem, ativo && styles.horarioItemAtivo]}
                    onPress={() => setHorarioSelecionado(h)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="time-outline" size={16} color={ativo ? '#fff' : theme.colors.primary} />
                    <Text style={[styles.horarioTexto, ativo && styles.horarioTextoAtivo]}>{h}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

          </ScrollView>

          <View style={styles.rodape}>
            {enviando
              ? <ActivityIndicator color={theme.colors.primary} />
              : <Button texto="Confirmar Agendamento" onPress={handleConfirmar} bg={theme.colors.primary} color="#fff" />
            }
            <View style={{ height: 8 }} />
            <Button texto="Cancelar" onPress={onClose} bg="#F1F1F1" color="#5C5F60" />
          </View>

        </View>
      </View>
    </Modal>
  );
};
