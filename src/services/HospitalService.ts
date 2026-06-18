import { catalogoHospitalApi as api } from "./api/api";



export interface Hospital {
    id: string;
    nome: string,
    endereco: string,
    telefone: string
}

export async function listarHospitais(): Promise<Hospital[]> {
    try {
        const response = await api.get('/hospital');
        return response.data
    } catch (error) {
        throw error
    }

}