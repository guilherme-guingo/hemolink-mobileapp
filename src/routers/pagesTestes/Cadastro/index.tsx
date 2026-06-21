import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import { Input } from '../../../components/Input';
import { AuthFormWrapper } from '../../../components/AuthFormWrapper';
import { apiAuth } from '../../../services/api/api'; 

import { formatCPF } from '../../../util/formataCPF'; 
import { apenasNumeros } from '../../../util/apenasNumeros'; 

import Toast from 'react-native-toast-message';
import { 
  ErrorText, 
  PasswordContainer, 
  ToggleButton, 
  EyeIcon, 
  SignInContainer,
  SignInText,
  SignInBoldText
} from './style';

const cadastroSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  cpf: z.string()
    .min(1, 'O CPF é obrigatório.')
    .length(11, 'O CPF deve conter exatamente 11 números.'),
  email: z.string().min(1, 'O e-mail é obrigatório.').email({ message: 'Insira um e-mail válido.' }),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmarSenha: z.string().min(1, 'A confirmação de senha é obrigatória.'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmarSenha"], 
});

type CadastroFormData = z.infer<typeof cadastroSchema>;

export function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const navigation = useNavigation<any>();

  const { control, handleSubmit, formState: { errors } } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: '', cpf: '', email: '', senha: '', confirmarSenha: '' },
  });

  async function handleCadastro(data: CadastroFormData) {
    if (loading) return;
    try {
      setLoading(true);
      
      const { confirmarSenha, ...dadosFiltrados } = data;

      const payload = {
        ...dadosFiltrados,
        tipo: 'doador'
      };

      await apiAuth.post('/user', payload);

      Toast.show({
        type: 'success',
        text1: 'Conta criada!',
      });

      navigation.navigate('StackLogin');

    } catch (error: any) {
      console.error('Erro ao cadastrar doador no MockAPI:', error?.response?.data || error.message);
      
      Toast.show({
        type: 'error',
        text1: 'Erro no cadastro',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFormWrapper
      title="Crie sua conta"
      subtitle=""
      buttonText="Cadastrar"
      isLoading={loading}
      onSubmit={handleSubmit(handleCadastro)}
      footer={
        <SignInContainer>
          <SignInText>Já tem uma conta? </SignInText>
          <TouchableOpacity onPress={() => navigation.navigate('StackLogin')} activeOpacity={0.7}>
            <SignInBoldText>Faça Login</SignInBoldText>
          </TouchableOpacity>
        </SignInContainer>
      }
    >

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="Nome completo"
              onChangeText={onChange}
              value={value || ''}
              hasError={!!errors.nome}
            />
            {errors.nome?.message && <ErrorText>{errors.nome.message}</ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="CPF (000.000.000-00)"
              /* 🌟 ATUALIZADO: Agora usa as duas funções da pasta util em perfeita sintonia */
              onChangeText={(text) => onChange(apenasNumeros(text).slice(0, 11))}
              value={formatCPF(value || '')}
              hasError={!!errors.cpf}
            />
            {errors.cpf?.message && <ErrorText>{errors.cpf.message}</ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="E-mail"
              onChangeText={onChange}
              value={value || ''}
              hasError={!!errors.email}
            />
            {errors.email?.message && <ErrorText>{errors.email.message}</ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <>
            <PasswordContainer>
              <Input
                placeholder="Senha"
                secureTextEntry={securePassword}
                onChangeText={onChange}
                value={value || ''}
                hasError={!!errors.senha}
              />
              <ToggleButton onPress={() => setSecurePassword(!securePassword)}>
                <EyeIcon name={securePassword ? 'eye' : 'eye-off'} />
              </ToggleButton>
            </PasswordContainer>
            {errors.senha?.message && <ErrorText>{errors.senha.message}</ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmarSenha"
        render={({ field: { onChange, value } }) => (
          <>
            <PasswordContainer>
              <Input
                placeholder="Confirmar senha"
                secureTextEntry={secureConfirmPassword}
                onChangeText={onChange}
                value={value || ''}
                hasError={!!errors.confirmarSenha}
              />
              <ToggleButton onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
                <EyeIcon name={secureConfirmPassword ? 'eye' : 'eye-off'} />
              </ToggleButton>
            </PasswordContainer>
            {errors.confirmarSenha?.message && <ErrorText>{errors.confirmarSenha.message}</ErrorText>}
          </>
        )}
      />
    </AuthFormWrapper>
  );
}