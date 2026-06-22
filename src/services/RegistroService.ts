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
  dataPedido?: string;
  criadoEm: string;
}

export async function enviarRegistro(registro: Omit<RegistroDoacao, 'id'>) {
  try {
    const response = await registroApi.post('/registros', registro);
    return response;
  } catch (error) {
    throw error;
  }
}