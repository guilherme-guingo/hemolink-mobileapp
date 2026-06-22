import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

interface Props {
  nome: string;
  cpf: string;
  tipoSanguineo: string;
  onPressTipo?: () => void;
}

export function DadosDoador({ nome, cpf, tipoSanguineo, onPressTipo }: Props) {
  return (
    <View style={styles.dadosBox}>
      <View style={styles.dadoLinha}>
        <Text style={styles.dadoChave}>Nome</Text>
        <Text style={styles.dadoValor}>{nome || '—'}</Text>
      </View>
      <View style={styles.dadoLinha}>
        <Text style={styles.dadoChave}>CPF</Text>
        <Text style={styles.dadoValor}>{cpf || '—'}</Text>
      </View>
      <View style={[styles.dadoLinha, { borderBottomWidth: 0 }]}>
        <Text style={styles.dadoChave}>Tipo Sanguíneo</Text>
        <TouchableOpacity
          style={styles.tipoSanguineoBox}
          onPress={onPressTipo}
          activeOpacity={onPressTipo ? 0.7 : 1}
          disabled={!onPressTipo}
        >
          <Text style={styles.tipoSanguineoTexto}>{tipoSanguineo || '—'}</Text>
          {onPressTipo && <Ionicons name="chevron-down" size={14} color="#fff" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
