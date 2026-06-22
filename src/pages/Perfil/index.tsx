import { Text, View, Image, Modal, TouchableOpacity, ScrollView, TextInput, FlatList, KeyboardAvoidingView, Platform } from "react-native"
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import { Button } from "../../components/Button";
import { styles } from './style';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import { CardBasePerfil } from "../../components/CardBasePerfil";
import { InfoPerfil } from "../../components/InfoPerfil";
import { theme } from '../../theme';
import { lerFoto, salvarFoto } from "../../util/fotoStorage";
import { useAuth } from "../../contexts/AuthContext";
import { lerDados, salvarDados } from "../../util/dadosEditaveis";
import { Input } from "../../components/Input";
import { acoesRapidas } from "./acoesRapidas";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Perfil = () => {
  const [foto, setFoto] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [nome, setNome] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [modalEditarVisible, setModalEditarVisible] = useState<boolean>(false);

  const { user, signOut, updateUser } = useAuth();

  useEffect(() => {
    const carregarFoto = async () => {
      const uriSalva = await lerFoto();
      if (uriSalva) setFoto(uriSalva);
    };
    carregarFoto();

    const carregarDados = async () => {
      const dados = await lerDados();
      if (dados) {
        setNome(dados.nome);
        setTelefone(dados.telefone);
      } else {
        setNome(user?.nome || "");
        setTelefone(user?.telefone || "Não cadastrado");
      }
    };
    carregarDados();
  }, [user]);


  const escolherDaGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!resultado.canceled) {
      const uri = (resultado.assets[0].uri);
      setFoto(uri);
      await salvarFoto(uri);
    }
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) return;
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      setFoto(uri);
      await salvarFoto(uri);
    }
  }

  const salvarEdicao = async () => {
    await salvarDados({ nome, telefone });

    if (user) {
      await updateUser({
        ...user,
        nome: nome
      });
    }
    setModalEditarVisible(false);
  };

 const handleLogout = async () => {
    try {
      setNome('');
      setTelefone('');
      setFoto(null);
      const keys = await AsyncStorage.getAllKeys();
      
      if (keys.length > 0) {
        await AsyncStorage.multiRemove(keys);
      }
      await signOut();

    } catch (error) {
      console.error("Erro ao limpar os dados:", error);
    }
  }




  return (
    <View style={styles.tela}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollConteudo}
      >
        <LinearGradient
          colors={['#FFF5F5', '#FFE0E0']}
          style={styles.cardPerfil}
        >
          <View style={styles.perfilTopo}>
            <View>
              {foto ? <Image source={{ uri: foto }} style={styles.fotoPerfil} />
                : <View style={styles.fotoPlaceholder} />
              }
              <TouchableOpacity style={styles.lapis} onPress={() => setModalVisible(true)}>
                <Ionicons name="pencil" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.perfilInfo}>
              <Text style={styles.nome}>{nome || "-"}</Text>
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

        <FlatList
          data={acoesRapidas}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaAcoes}
          renderItem={({ item }) => (
           <View style={styles.cardAcao}>
              <View style={styles.headerCard}>
                <Ionicons name={item.icone} size={18} color="#C8102E" />
                <Text style={styles.tagTexto}>{item.titulo.toUpperCase()}</Text>
              </View>
              <Text style={styles.tituloDicas}>{item.textoPrincipal}</Text>
              <Text style={styles.destaqueCard}>{item.textoDestaque}</Text>
              {item.rodape && (
                <Text style={styles.rodapeCard}>{item.rodape}</Text>
              )}
            </View>
          )}
        />

        <View style={styles.tituloLinha}>
          <Text style={styles.tituloCard}>DADOS PESSOAIS</Text>
          <TouchableOpacity onPress={() => setModalEditarVisible(true)}>
            <Text style={styles.editar}>EDITAR</Text>
          </TouchableOpacity>
        </View>
        <CardBasePerfil>
          <InfoPerfil icone="person-outline" label="Nome Completo" valor={nome || "-"} />
          <InfoPerfil icone="mail-outline" label="E-mail" valor={user?.email || "-"} />
          <InfoPerfil icone="call-outline" label="Telefone" valor={telefone} semLinha />
        </CardBasePerfil>
        <View style={styles.tituloLinha}>
          <Text style={styles.tituloCard}>INFORMAÇÕES MÉDICAS</Text>
        </View>
        <CardBasePerfil cor="#fdfdfd">
          <InfoPerfil icone="checkmark-circle-outline" label="Status de Aptidão" valor="Elegível" semLinha />
        </CardBasePerfil>
        <CardBasePerfil>
          <InfoPerfil icone="calendar-outline" label="Última Doação" valor="15 de Outubro de 2025" semLinha />
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
        <TouchableOpacity onPress={handleLogout} style={styles.botaoLogout}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.primary} />
          <Text style={{ color: theme.colors.primary, fontSize: 16, fontWeight: '600'}}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalFundo}>
              <View style={styles.modalCaixa}>
                  <Text style={styles.modalTitulo}>Foto de Perfil</Text>
                  <Button texto="Tirar foto" onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => tirarFoto(), 600);
                  }} />
                  <Button texto="Escolher da galeria" onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => escolherDaGaleria(), 600);
                  }} />
                  <Button texto="Cancelar" onPress={() => setModalVisible(false)} bg="#fff" color={theme.colors.primary} />
              </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalEditarVisible}
          onRequestClose={() => setModalEditarVisible(false)}
        >
        <KeyboardAvoidingView 
            style={styles.modalFundo}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.modalCaixa}>
                <Text style={styles.modalTitulo}>Editar Dados</Text>
                <Text style={styles.modalLabel}>Nome</Text>
                <Input value={nome} onChangeText={setNome} />
                <Text style={styles.modalLabel}>Telefone</Text>
                <Input value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
                <Button texto="Salvar" onPress={salvarEdicao} />
                <Button texto="Cancelar" onPress={() => setModalEditarVisible(false)} bg="#fff" color={theme.colors.primary} />
            </View>
        </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </View>
  )
}