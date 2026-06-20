import { Text, View, Image, Modal, TouchableOpacity } from "react-native"
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Button } from "../../components/Button";
import { styles } from './style';
import Ionicons from "@expo/vector-icons/Ionicons";

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
  <View style={styles.container}>
    <View style={styles.cardPerfil}>
      <View style={styles.perfilTopo}>
        <View>
          {foto && <Image source={{ uri: foto }} style={styles.fotoPerfil} />}
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
    </View>

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
    </View>
  )
}