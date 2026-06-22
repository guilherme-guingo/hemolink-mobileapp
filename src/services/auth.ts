import { apiAuth as api } from './api/api'
export interface SignInData {
    email: string;
    senha: string;
}
export interface User {
    id: string;
    nome: string;
    cpf: string;
    pontos:number;
    tipoSanguineo: string
    email: string;
    tipo: 'doador' | 'admin';
    token?: string;
    telefone?: string
}
export async function signInRequest(data: SignInData): Promise<User> {
    try {
        const response = await api.get<User[]>('/user', {
            params: { email: data.email, senha: data.senha },
        });
        const users = response.data;
        if (users.length === 0) {
            throw new Error('Usuário não encontrado');
        }
        const user = users[0];
        return {
            ...user,
            token: 'fake-token-' + Date.now(),
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Erro ao conectar com o servidor');
    }
}
