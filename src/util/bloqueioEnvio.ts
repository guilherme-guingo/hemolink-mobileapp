import AsyncStorage from '@react-native-async-storage/async-storage';
import { TipoRegistro } from '../services/RegistroService';

function getChave(cpf: string, tipo: TipoRegistro): string {
  return `@hemolink:envio_${tipo}_${cpf}`;
}

export async function jaEnviou(cpf: string, tipo: TipoRegistro): Promise<boolean> {
  const valor = await AsyncStorage.getItem(getChave(cpf, tipo));
  return valor === 'true';
}

export async function marcarComoEnviado(cpf: string, tipo: TipoRegistro): Promise<void> {
  await AsyncStorage.setItem(getChave(cpf, tipo), 'true');
}

export async function limparBloqueios(cpf: string): Promise<void> {
  await AsyncStorage.removeItem(getChave(cpf, 'doacao'));
  await AsyncStorage.removeItem(getChave(cpf, 'pedido'));
}