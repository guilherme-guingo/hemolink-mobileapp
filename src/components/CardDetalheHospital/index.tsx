import React from 'react';
import { View, Text, Image } from 'react-native';
import { Hospital } from '../../services/HospitalService';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../theme';
import { styles } from './style';
import { TIPOS_SANGUE } from '../../util/constantes';

interface Props {
  hospital: Hospital;
}

export const CardDetalheHospital = ({ hospital }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: hospital.image }} style={styles.imagem} />
      
      <View style={styles.conteudo}>
        <Text style={styles.nome}>{hospital.name}</Text>
        
        <View style={styles.linhaIcone}>
          <Ionicons name="location-sharp" size={16} color={theme.colors.primary} />
          <Text style={styles.texto}>
            {hospital.address}, {hospital.city} - {hospital.state}
          </Text>
        </View>

        <View style={styles.linhaIcone}>
          <FontAwesome5 name="phone" size={14} color={theme.colors.primary} />
          <Text style={styles.texto}>{hospital.phone}</Text>
        </View>

        <View style={styles.linhaIcone}>
          <FontAwesome5 name="clock" size={14} color={theme.colors.primary} />
          <Text style={styles.texto}>{hospital.openingHours}</Text>
        </View>

        <Text style={styles.tituloEstoque}>Necessidade Atual de Sangue:</Text>
        <View style={styles.gridSangue}>
          {TIPOS_SANGUE.map((tipo) => (
            <View key={tipo} style={styles.boxSangue}>
              <Text style={styles.tipoSangue}>{tipo}</Text>
              <Text style={styles.porcentagemSangue}>{hospital.bloodStock[tipo]}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};