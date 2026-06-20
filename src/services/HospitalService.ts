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

export async function listarHospitais(): Promise<Hospital[]> {
    try {
        const response = await api.get('/hospital');
        return response.data
    } catch (error) {
        throw error
    }

}