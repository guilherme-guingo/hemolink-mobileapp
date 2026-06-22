import React, { ReactElement, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { Hospital, listarHospitais } from '../../services/HospitalService';
import { theme } from '../../theme';

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export function HospitalPicker({ value, onChange }: Props): ReactElement {
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarHospitais()
      .then(res => {
        const lista: Hospital[] = res.data;
        setHospitais(lista);
        if (lista.length > 0 && !value) onChange(lista[0].id);
      })
      .catch(() => Toast.show({ type: 'error', text1: 'Erro ao carregar unidades' }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator color={theme.colors.primary} />;

  return (
    <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, overflow: 'hidden' }}>
      <Picker selectedValue={value} onValueChange={onChange}>
        {hospitais.map(h => (
          <Picker.Item key={h.id} label={`${h.name} - ${h.city}`} value={h.id} />
        ))}
      </Picker>
    </View>
  );
}
