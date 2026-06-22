import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignInData, User } from '../services/auth';
import { apiAuth } from '../services/api/api';

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
}

interface UsuarioAPI {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  avatar?: string;
  telefone?: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY = '@hemolink:user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedUser() {
      try {
        const userStoraged = await AsyncStorage.getItem(STORAGE_KEY);
        if (userStoraged) {
          setUser(JSON.parse(userStoraged));
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Erro ao carregar usuário do cache', err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadStoragedUser();
  }, []);

  async function signIn(data: SignInData) {
    try {
      const response = await apiAuth.get<UsuarioAPI[]>('/user');
      const listaUsuarios = response.data;
      const usuarioLogado = listaUsuarios.find(
        (u) => u.email === data.email && u.senha === data.senha
      );

      if (!usuarioLogado) throw new Error('E-mail ou senha incorretos.');

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));
      setUser(usuarioLogado as unknown as User);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erro desconhecido ao fazer login');
    }
  }


  async function updateUser(updatedUser: User) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao atualizar usuário no cache:', error.message);
      }
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao deslogar:', error.message);
      }
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider');
  return context;
}