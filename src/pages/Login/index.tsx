import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, ActivityIndicator } from 'react-native'; 

import { Input } from '../../components/Input';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';

import Toast from 'react-native-toast-message';
import { useAuth } from '../../contexts/AuthContext';

import {
  ErrorText,
  PasswordContainer,
  ToggleButton,
  EyeIcon,
  SignUpContainer,
  SignUpText,
  SignUpBoldText, 
  GoogleButton,
  GoogleButtonText,
  GoogleIcon,
} from './styles';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email({ message: 'Insira um e-mail válido.' }),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [secureMode, setSecureMode] = useState(true);

  const navigation = useNavigation<any>();
  const { signIn, signInWithGoogle } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function handleLogin(data: LoginFormData) {
    if (loading || loadingGoogle) return;
    try {
      setLoading(true);
      await signIn({ email: data.email, senha: data.password });
      
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Bem-vindo ao HemoLink!',
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Falha na autenticação',
        text2: 'E-mail ou senha incorretos.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    if (loading || loadingGoogle) return;
    try {
      setLoadingGoogle(true);
      await signInWithGoogle();
      
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Bem-vindo ao HemoLink!',
      });

      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Falha no Login',
        text2: 'Não foi possível autenticar com a conta Google.',
      });
    } finally {
      setLoadingGoogle(false);
    }
  }

  function handleNavigateToRegister() {
    navigation.navigate('Cadastro');
  }

  return (
    <AuthFormWrapper
      title="HemoLink"
      subtitle="Conectando doadores a vidas"
      buttonText="Entrar"
      isLoading={loading || loadingGoogle}
      onSubmit={handleSubmit(handleLogin)}
      footer={
        <>
          <GoogleButton
            activeOpacity={0.8}
            disabled={loading || loadingGoogle}
            onPress={handleGoogleLogin}
          >
            {loadingGoogle ? (
              <ActivityIndicator color='#DB4437' size="small" />
            ) : (
              <>
                <GoogleIcon />
                <GoogleButtonText>Entrar com o Google</GoogleButtonText>
              </>
            )}
          </GoogleButton>

          <SignUpContainer>
            <SignUpText>Não tem uma conta? </SignUpText>
            <TouchableOpacity onPress={handleNavigateToRegister} activeOpacity={0.7}>
              <SignUpBoldText>Cadastre-se</SignUpBoldText>
            </TouchableOpacity>
          </SignUpContainer>
        </>
      }
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="E-mail"
              onChangeText={(text) => onChange(text.toLowerCase().trim())}
              value={value || ''}
              hasError={!!errors.email}
            />
            {errors.email?.message && <ErrorText>{errors.email.message}</ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <PasswordContainer>
              <Input
                placeholder="Senha"
                secureTextEntry={secureMode}
                onChangeText={onChange}
                value={value || ''}
                hasError={!!errors.password}
              />
              <ToggleButton onPress={() => setSecureMode(!secureMode)}>
                <EyeIcon name={secureMode ? 'eye' : 'eye-off'} />
              </ToggleButton>
            </PasswordContainer>
            {errors.password?.message && <ErrorText>{errors.password.message}</ErrorText>}
          </>
        )}
      />
    </AuthFormWrapper>
  );
}