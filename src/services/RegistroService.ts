import { registroApi } from './api/api';

export type TipoRegistro = 'doacao' | 'pedido';

export interface RegistroDoacao {
  id?: string;
  nome: string;
  cpf: string;
  tipoSanguineo: string;
  tipoRegistro: TipoRegistro;
  unidadeId: string;
  ultimaDoacao?: string;
  horario?: string;
  dataPedido?: string;
  criadoEm: string;
  doacaoRealizada?: boolean;
}


export async function enviarRegistro(registro: Omit<RegistroDoacao, 'id'>) {
  try {
    const response = await registroApi.post<RegistroDoacao>('/registros', registro);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function listarRegistros() {
  try {
    const response = await registroApi.get<RegistroDoacao[]>('/registros');
    return response;
  } catch (error) {
    throw error;
  }
}

