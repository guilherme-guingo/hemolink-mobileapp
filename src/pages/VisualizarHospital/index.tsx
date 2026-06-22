import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParametrosRotasApp } from '../../routers/navigation';
import { Hospital, buscarHospital } from '../../services/HospitalService';
import { CardDetalheHospital } from '../../components/CardDetalheHospital';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { theme } from '../../theme';
import { styles } from './style';

type Props = NativeStackScreenProps<ParametrosRotasApp, 'VisualizarHospital'>;

export const VisualizarHospital = ({ route, navigation }: Props) => {
  const id = route.params?.id;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarHospital(id)
      .then(res => setHospital(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!hospital) {
    return (
      <View style={styles.center}>
        <Text>Hospital não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.backButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>

        <CardDetalheHospital hospital={hospital} />

        <View style={styles.acoes}>
          <Button 
            texto="Agendar Doação" 
            //Icaro, faz a boa depois
            onPress={() => console.log('Ir para Formulário')} 
            bg={theme.colors.primary} 
            color="#fff" 
          />
          <View style={{ height: 10 }} />
          <Button 
            texto="Favoritar Hospital" 
            //deve ficar por isso mesmo
            onPress={() => console.log('Salvar nos favoritos')} 
            bg="#fff" 
            color={theme.colors.primary} 
            borderColor={theme.colors.primary} 
          />
        </View>
      </ScrollView>
    </View>
  );
};