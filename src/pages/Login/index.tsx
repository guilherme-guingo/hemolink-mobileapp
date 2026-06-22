import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Text } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';

import { Input } from '../../components/Input';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { ParametrosRotasAuth } from '../../routers/navigation';

import Toast from 'react-native-toast-message';
import { useAuth } from '../../contexts/AuthContext';

import { styles } from './styles';

const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório.').email({ message: 'Insira um e-mail válido.' }),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [loading, setLoading] = useState(false);
  const [secureMode, setSecureMode] = useState(true);

  type NavegacaoProps = NativeStackNavigationProp<ParametrosRotasAuth>;
  const navigation = useNavigation<NavegacaoProps>();
  const { signIn} = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Login tradicional com E-mail e Senha
  async function handleLogin(data: LoginFormData) {
    if (loading ) return;
    try {
      setLoading(true);
      await signIn({ email: data.email, senha: data.password });
      
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Bem-vindo ao HemoLink!',
      });

    } catch{
      Toast.show({
        type: 'error',
        text1: 'Falha na autenticação',
        text2: 'E-mail ou senha incorretos.',
      });
    } finally {
      setLoading(false);
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
      isLoading={loading}
      onSubmit={handleSubmit(handleLogin)}
      footer={
        <>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={handleNavigateToRegister} activeOpacity={0.7}>
              <Text style={styles.signUpBoldText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
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
            {errors.email?.message && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <View style={styles.passwordContainer}>
              <Input
                placeholder="Senha"
                secureTextEntry={secureMode}
                onChangeText={onChange}
                value={value || ''}
                hasError={!!errors.password}
              />
              <TouchableOpacity style={styles.toggleButton} onPress={() => setSecureMode(!secureMode)}>
                <Ionicons name={secureMode ? 'eye' : 'eye-off'} size={22} color="#8E8E93" style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
            {errors.password?.message && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </>
        )}
      />
    </AuthFormWrapper>
  );
}