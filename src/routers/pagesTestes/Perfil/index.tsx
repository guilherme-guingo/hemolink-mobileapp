import { Text, View, Image } from "react-native"
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Button } from "../../../components/Button";
import { styles } from './style';

export const Perfil = () => {
  const [foto, setFoto] = useState<string | null>(null);

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
      {foto && <Image source={{ uri: foto }} style={styles.foto}/>}
      <Button texto="Escolher da galeria" onPress={escolherDaGaleria} />
      <Button texto="Tirar foto" onPress={tirarFoto} />
    </View>
  )
}