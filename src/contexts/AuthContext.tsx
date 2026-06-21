import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignInData, User } from '../services/auth';
import { apiAuth } from '../services/api/api';

import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY = '@hemolink:user';

WebBrowser.maybeCompleteAuthSession();

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

  // Hook genérico e unificado do Google via AuthSession
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

  useEffect(() => {
    if (response?.type === 'success') {
      handleGoogleResponse(response);
    }
  }, [response]);

  async function handleGoogleResponse(response: any) {
    try {
      const accessToken = response.authentication?.accessToken || response.params?.access_token;
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

  // Login tradicional por E-mail e Senha
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

  async function signInWithGoogle() {
    try {
      await promptAsync();
    } catch (error: any) {
      console.error('Erro ao iniciar fluxo de login:', error);
      throw error;
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