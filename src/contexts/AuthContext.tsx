import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { SignInData, User } from '../services/auth';

import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { apiAuth } from '../services/api/api'; 
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY = '@hemolink:user'; 

GoogleSignin.configure({
  webClientId: '77714710968-1bbf822g9ht8360pjkqatjihbrib4pme.apps.googleusercontent.com',
  offlineAccess: true,
});

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
          const userLogged = JSON.parse(userStoraged);
          setUser(userLogged);
        }
      } catch (err) {
        console.error('Erro ao carregar usuário do armazenamento local', err);
      } finally {
        setLoading(false);
      }
    }
    loadStoragedUser();
  }, []);

  async function signIn(data: SignInData) {
    try {
      // Busca a lista na rota /user correta
      const response = await apiAuth.get('/user');
      const listaUsuarios = response.data;

      const usuarioLogado = listaUsuarios.find(
        (u: any) => u.email === data.email && u.senha === data.senha
      );

      if (!usuarioLogado) {
        throw new Error('E-mail ou senha incorretos.');
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));
      setUser(usuarioLogado);

    } catch (error) {
      console.error('Erro na autenticação com MockAPI:', error);
      throw error; 
    }
  }

  async function signInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const googleUser = response.data?.user || (response as any).user;
      if (!googleUser) {
        throw new Error('Não foi possível obter os dados do usuário do Google');
      }
      const mockApiResponse = await apiAuth.get('/user');
      const listaUsuarios = mockApiResponse.data;
      let usuarioLogado = listaUsuarios.find((u: any) => u.email === googleUser.email);
      if (!usuarioLogado) {
        const novoUsuario = {
          nome: googleUser.name,
          email: googleUser.email,
          senha: 'login_social_google_hemolink',
          avatar: googleUser.photo || ''
        };
        const createResponse = await apiAuth.post('/user', novoUsuario);
        usuarioLogado = createResponse.data;
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));
      setUser(usuarioLogado);
    } catch (error: any) {
      console.error('Erro na autenticação com Google:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    await GoogleSignin.signOut();
    } catch (error) {
      console.error('Erro ao deslogar: ', error);
    } finally {
    setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
}