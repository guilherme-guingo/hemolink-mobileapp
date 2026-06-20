import { catalogoHospitalApi as api } from "./api/api";


export interface Hospital {
  id: string;
  image: string;
  name: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  email: string;
  website: string;
  openingHours: string;
  bloodStock: BloodStock;
}

export interface BloodStock {
  "A+": number;
  "A-": number;
  "B+": number;
  "B-": number;
  "AB+": number;
  "AB-": number;
  "O+": number;
  "O-": number;
}

export async function listarHospitais() {
  try {
    const response = await api.get('/hospital');
    return response;
  } catch (error) {
    throw error;
  }
}

export async function cadastrarHospital(data: Omit<Hospital, 'id'>) {
  try {
    const response = await api.post('hospital', data)
    return response
  } catch (error) {
    throw error
  }
}

export async function buscarHospital(id: string) {
  try {
    const response = await api.get(`/hospital/${id}`)
    return response
  } catch (err) {
    throw err
  }
}

export async function atualizarHospital(id: string, data: Partial<Hospital>) {
  try {
    const response = await api.put(`/hospital/${id}`, data)
    return response
  } catch (err) {
    throw err
  }
}

export async function excluirHospital(id: string) {
  try {
    await api.delete(`/hospital/${id}`)

  } catch (err) {
    throw err
  }
}