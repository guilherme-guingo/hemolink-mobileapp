import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignInData, User } from '../services/auth';
import { apiAuth } from '../services/api/api';

import * as AuthSession from 'expo-auth-session';

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signInWithGoogle: () => Promise<boolean>; // 🌟 Atualizado para retornar um booleano
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY = '@hemolink:user';

const googleDiscovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hook unificado do Google
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '77714710968-1bbf822g9ht8360pjkqatjihbrib4pme.apps.googleusercontent.com',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri(),
      responseType: AuthSession.ResponseType.Token,
      usePKCE: false,
    },
    googleDiscovery
  );

  // Processa a resposta do Google, busca os dados e salva na API
  async function handleGoogleResponse(authResponse: any) {
    try {
      const accessToken = authResponse.authentication?.accessToken || authResponse.params?.access_token;
      if (!accessToken) throw new Error('Token de acesso não encontrado.');

      const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const googleUser = await userInfoResponse.json();
      if (!googleUser || !googleUser.email) {
        throw new Error('Dados inválidos vindos do Google.');
      }

      const mockApiResponse = await apiAuth.get('/user');
      const listaUsuarios = mockApiResponse.data;
      let usuarioLogado = listaUsuarios.find((u: any) => u.email === googleUser.email);

      if (!usuarioLogado) {
        const novoUsuario = {
          nome: googleUser.name,
          email: googleUser.email,
          senha: 'login_social_google_hemolink',
          avatar: googleUser.picture || '',
        };
        const createResponse = await apiAuth.post('/user', novoUsuario);
        usuarioLogado = createResponse.data;
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));
      setUser(usuarioLogado);
    } catch (error: any) {
      console.error('Erro ao processar login com Google:', error);
      throw error;
    }
  }

  useEffect(() => {
    async function loadStoragedUser() {
      try {
        const userStoraged = await AsyncStorage.getItem(STORAGE_KEY);
        if (userStoraged) {
          setUser(JSON.parse(userStoraged));
        }
      } catch (err) {
        console.error('Erro ao carregar usuário do cache', err);
      } finally {
        setLoading(false);
      }
    }
    loadStoragedUser();
  }, []);

  async function signIn(data: SignInData) {
    try {
      const response = await apiAuth.get('/user');
      const listaUsuarios = response.data;
      const usuarioLogado = listaUsuarios.find(
        (u: any) => u.email === data.email && u.senha === data.senha
      );

      if (!usuarioLogado) throw new Error('E-mail ou senha incorretos.');

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));
      setUser(usuarioLogado);
    } catch (error) {
      throw error;
    }
  }

  // 🌟 SINCRONIZADO: Agora a ecrã de login pode dar "await" real até o utilizador estar guardado!
  async function signInWithGoogle() {
    try {
      const result = await promptAsync();
      
      if (result?.type === 'success') {
        await handleGoogleResponse(result);
        return true; // Retorna verdadeiro indicando que todo o processo terminou com sucesso
      }
      
      return false;
    } catch (error: any) {
      console.error('Erro ao iniciar fluxo de login:', error);
      return false;
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
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
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider');
  return context;
}