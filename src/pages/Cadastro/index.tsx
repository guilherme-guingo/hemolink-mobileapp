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
import { apiAuth } from '../../services/api/api'; 

import { formatCPF } from '../../util/formataCPF'; 
import { apenasNumeros } from '../../util/apenasNumeros'; 
import { formatPhone } from '../../util/formataTelefone'; 
import { ParametrosRotasAuth } from '../../routers/navigation';

import Toast from 'react-native-toast-message';
import { styles } from './styles';

const tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

const cadastroSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  cpf: z.string()
    .min(1, 'O CPF é obrigatório.')
    .length(11, 'O CPF deve conter exatamente 11 números.'),
  telefone: z.string()
    .min(1, 'O telefone é obrigatório.')
    .min(10, 'O telefone deve conter no mínimo 10 dígitos com DDD.')
    .max(11, 'O telefone deve conter no máximo 11 dígitos.'),
  email: z.string().min(1, 'O e-mail é obrigatório.').email({ message: 'Insira um e-mail válido.' }),
  tipoSanguineo: z.enum(tiposSanguineos, {
    message: 'Selecione um tipo sanguíneo.',
  }),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmarSenha: z.string().min(1, 'A confirmação de senha é obrigatória.'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmarSenha"], 
});

type CadastroFormData = z.infer<typeof cadastroSchema>;

interface UsuarioAPI {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  avatar?: string;
}

export function Cadastro() {
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  type NavegacaoProps = NativeStackNavigationProp<ParametrosRotasAuth>;
  const navigation = useNavigation<NavegacaoProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: '', cpf: '', telefone: '', email: '', senha: '', confirmarSenha: '' },
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

      await apiAuth.post<UsuarioAPI>('/user', payload);

      Toast.show({
        type: 'success',
        text1: 'Conta criada!',
      });

      navigation.navigate('Login');

    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : 'Erro no cadastro';
      Toast.show({
        type: 'error',
        text1: mensagem,
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
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
            <Text style={styles.signInBoldText}>Faça Login</Text>
          </TouchableOpacity>
        </View>
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
            {errors.nome?.message && <Text style={styles.errorText}>{errors.nome.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="CPF"
              onChangeText={(text) => onChange(apenasNumeros(text).slice(0, 11))}
              value={formatCPF(value || '')}
              hasError={!!errors.cpf}
            />
            {errors.cpf?.message && <Text style={styles.errorText}>{errors.cpf.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="telefone"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="Telefone"
              keyboardType="phone-pad"
              onChangeText={(text) => onChange(apenasNumeros(text).slice(0, 11))}
              value={formatPhone(value || '')}
              hasError={!!errors.telefone}
            />
            {errors.telefone?.message && <Text style={styles.errorText}>{errors.telefone.message}</Text>}
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
              onChangeText={(text) => 
                onChange(text ? text.charAt(0).toLowerCase() + text.slice(1) : '')
              }
              value={value || ''}
              hasError={!!errors.email}
              
            />
            {errors.email?.message && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Tipo Sanguíneo</Text>
      <Controller
        control={control}
        name="tipoSanguineo"
        render={({ field: { onChange, value } }) => (
          <>
            <View style={styles.bloodGrid}>
              {tiposSanguineos.map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  activeOpacity={0.7}
                  onPress={() => onChange(tipo)}
                  style={[styles.bloodChip, value === tipo ? styles.bloodChipSelected : styles.bloodChipUnselected]}
                >
                  <Text style={[styles.bloodText, value === tipo ? styles.bloodTextSelected : styles.bloodTextUnselected]}>{tipo}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.tipoSanguineo?.message && (
              <Text style={[styles.errorText, { marginBottom: 12 }]}>{errors.tipoSanguineo.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <>
            <View style={styles.passwordContainer}>
              <Input
                placeholder="Senha"
                secureTextEntry={securePassword}
                onChangeText={onChange}
                value={value || ''}
                hasError={!!errors.senha}
              />
              <TouchableOpacity style={styles.toggleButton} onPress={() => setSecurePassword(!securePassword)}>
                <Ionicons name={securePassword ? 'eye' : 'eye-off'} size={22} color="#8E8E93" style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
            {errors.senha?.message && <Text style={styles.errorText}>{errors.senha.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmarSenha"
        render={({ field: { onChange, value } }) => (
          <>
            <View style={styles.passwordContainer}>
              <Input
                placeholder="Confirmar senha"
                secureTextEntry={secureConfirmPassword}
                onChangeText={onChange}
                value={value || ''}
                hasError={!!errors.confirmarSenha}
              />
              <TouchableOpacity style={styles.toggleButton} onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
                <Ionicons name={secureConfirmPassword ? 'eye' : 'eye-off'} size={22} color="#8E8E93" style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
            {errors.confirmarSenha?.message && <Text style={styles.errorText}>{errors.confirmarSenha.message}</Text>}
          </>
        )}
      />
    </AuthFormWrapper>
  );
}