import { Text, View, Image, Modal, TouchableOpacity, ScrollView } from "react-native"
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Button } from "../../components/Button";
import { styles } from './style';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import { CardBasePerfil } from "../../components/CardBasePerfil";
import { InfoPerfil } from "../../components/InfoPerfil";
import { theme } from '../../theme'; 
import { lerFavoritos, salvarFavoritos } from "../../util/favoritosStorage";

export const Perfil = () => {
  const [foto, setFoto] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false)

  const escolherDaGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if (!resultado.canceled) 
      setFoto(resultado.assets[0].uri);
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) return;
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1,1],
      quality: 1
    });
    if (!resultado.canceled) setFoto(resultado.assets[0].uri);
  }





  return(
  <ScrollView style={styles.container}>
    <LinearGradient
      colors={['#fff', '#ffcfcf']}
      style={styles.cardPerfil}
      >
      <View style={styles.perfilTopo}>
        <View>
          {foto ? <Image source={{ uri: foto }} style={styles.fotoPerfil} />
                :  <View style={styles.fotoPlaceholder} />
          }
          <TouchableOpacity style={styles.lapis} onPress={() => setModalVisible(true)}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.perfilInfo}>
          <Text style={styles.nome}> Joao Silva</Text>
          <View style={styles.badges}>
            <Text style={styles.badgeDoador}>DOADOR</Text>
            <Text style={styles.badgeSangue}>O Negativo</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.estatisticas}>
        <View style={styles.estatItem}>
          <Text style={styles.estatNumero}>12</Text>
          <Text style={styles.estatLabel}>VIDAS SALVAS</Text>
        </View>
        <View style={styles.estatItem}>
          <Text style={styles.estatNumero}>850</Text>
          <Text style={styles.estatLabel}>PONTOS</Text>
        </View>
      </View>
    </LinearGradient>
    <View style={styles.tituloLinha}>
      <Text style={styles.tituloCard}>DADOS PESSOAIS</Text>
      <TouchableOpacity><Text style={styles.editar}>EDITAR</Text></TouchableOpacity>
    </View>
    <CardBasePerfil>
      <InfoPerfil icone="person-outline" label="Nome Completo" valor="João Silva" />
      <InfoPerfil icone="mail-outline" label="E-mail" valor="joao.silva@email.com" />
      <InfoPerfil icone="call-outline" label="Telefone" valor="+55 (11) 98765-4321" semLinha />
    </CardBasePerfil>
    <View style={styles.tituloLinha}>
      <Text style={styles.tituloCard}>INFORMAÇÕES MÉDICAS</Text>
    </View>
    <CardBasePerfil cor="#fdfdfd">
      <InfoPerfil icone="checkmark-circle-outline" label="Status de Aptidão" valor="Elegível" semLinha/>
    </CardBasePerfil>
    <CardBasePerfil>
      <InfoPerfil icone="calendar-outline" label="Última Doação" valor="15 de Outubro de 2025" semLinha/>
    </CardBasePerfil>
    <CardBasePerfil cor="#fff0f0">
    <View style={styles.alerta}>
        <Ionicons name="warning-outline" size={24} color={theme.colors.primary} />
        <View style={styles.alertaTexto}>
            <Text style={styles.alertaTitulo}>Alertas de Saúde</Text>
            <Text style={styles.alertaDescricao}>
                Mantenha a hidratação reforçada nas 24h que antecedem sua próxima doação.
            </Text>
        </View>
    </View>
    </CardBasePerfil>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
        <Button texto="Tirar foto" onPress={() => {
            setModalVisible(false);
            setTimeout(() => tirarFoto(), 600);
}} />
        <Button texto="Escolher da galeria" onPress={() => {
           setModalVisible(false);
           setTimeout(() => escolherDaGaleria(), 600);
}} />
        <Button texto="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  )
}