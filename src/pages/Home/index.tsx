import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Header } from "../../components/Hearder";
import { styles } from "./style";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { BotaoAtalho } from "../../components/BotaoAtalho";

import { Animated, Easing } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRef, useCallback, useState } from "react";
import { ModalDoacao } from "../../components/ModalDoacao";

export const Home = () => {
  const [modalVisivel, setModalVisivel] = useState(false);

  const rotacao = useRef(new Animated.Value(0)).current;

  const animarMao = useCallback(() => {
    rotacao.setValue(0);

    Animated.sequence([
      Animated.timing(rotacao, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotacao, {
        toValue: -1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotacao, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rotacao, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [rotacao]);

  useFocusEffect(
    useCallback(() => {
      animarMao();
    }, [animarMao]),
  );

  // objetivo de conversao
  const rotacaoInterpolado = rotacao.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-18deg", "0deg", "18deg"],
  });

  const botoesFiltros = [
    {
      id: "1",
      label: "Agendar",
      icon: "calendar-outline",
      corIcone: "#9E001F",
    },
    { id: "2", label: "Histórico", icon: "time-outline", corIcone: "#9E001F" },
    {
      id: "3",
      label: "Carteirinha",
      icon: "card-outline",
      corIcone: "#9E001F",
    },
    {
      id: "4",
      label: "Indicar",
      icon: "share-social-outline",
      corIcone: "#9E001F",
    },
  ] as const;

  const dicas = [
    {
      id: "1",
      icon: "water-outline",
      titulo: "Hidratação",
      subtitulo: "Beba bastante água antes e depois da doação.",
    },
    {
      id: "2",
      icon: "fast-food-outline",
      titulo: "Alimentação",
      subtitulo: "Evite alimentos gordurosos 3h antes de doar.",
    },
    {
      id: "3",
      icon: "moon-outline",
      titulo: "Repouso",
      subtitulo: "Durma pelo menos 6h na noite anterior.",
    },
    {
      id: "4",
      icon: "wallet-outline",
      titulo: "Documento",
      subtitulo:
        "Leve um documento oficial com foto (RG, CNH ou e-Título) no dia da doação.",
    },
  ] as const;

  return (
    <View style={styles.containerMain}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerTitulo}>
          <View style={styles.containerSaudacao}>
            <Text style={styles.titulo}>Olá, "usuário"</Text>

            <Animated.Text
              style={[
                styles.emojiMao,
                {
                  transform: [{ rotate: rotacaoInterpolado }],
                },
              ]}
            >
              👋
            </Animated.Text>
          </View>

          <Text style={styles.subTitulo}>
            Seu gesto salva vidas todos os dias.
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitulo}>SEU IMPACTO</Text>
            <FontAwesome name="heart" size={24} color="#FFDAD8" />
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.miniCard}>
              <Text style={styles.numero}>3</Text>
              <Text style={styles.descricaoNumero}>Vidas Salvas</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={styles.numero}>1</Text>
              <Text style={styles.descricaoNumero}>Doação este ano</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerAgendamento}>
          <View>
            <Text style={styles.tituloAgendamento}>PRÓXIMO AGENDAMENTO</Text>
          </View>
          <View style={styles.containerCalendario}>
            <TouchableOpacity>
              <Feather name="calendar" size={16} color="#C8102E" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerAgenda}>
          <View style={styles.data}>
            <Text style={styles.dataMes}>OUT</Text>
            <Text style={styles.dataDia}>25</Text>
          </View>
          <View style={styles.containerData}>
            <Text style={styles.tituloData}>Hospital Central</Text>
            <Text style={styles.subtituloData}>Terça-feira as 10:00</Text>
          </View>
          <View style={styles.containerBotao}>
            <Button
              texto="Ver local"
              fontSizeTexto={12}
              paddingHorizontal={8}
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.containerBotoesPai}>
          <FlatList
            data={botoesFiltros}
            keyExtractor={(item) => item.id}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={styles.listaBotoesConteudo}
            renderItem={({ item }) => {
              return (
                <View>
                  <BotaoAtalho
                    label={item.label}
                    icon={item.icon}
                    onPress={() => {}}
                    corIcone={item.corIcone}
                  />
                </View>
              );
            }}
          />
        </View>

        <View style={styles.containerCampanhas}>
          <View>
            <Text style={styles.tituloCampanhas}>Dicas de Saúde</Text>
          </View>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: "5%" }}>
          <FlatList
            data={dicas}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => {
              return (
                <View style={styles.containerDicas}>
                  <View style={styles.containerDicasFilho}>
                    <View>
                      <Ionicons name={item.icon} size={28} color="#9E001F" />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "#141D23",
                          fontWeight: 500,
                          fontSize: 15,
                        }}
                      >
                        {item.titulo}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "#5C5F60" }}>{item.subtitulo}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.containerDoacao}>
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <FontAwesome5
                name="hand-holding-heart"
                size={32}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.tituloApoie}>Apoie a HemoLink</Text>
            <Text style={styles.subTituloApoie}>
              Sua doação financeira nos ajuda a manter equipamento de ponta.
            </Text>
          </View>
          <View style={styles.containerBotaoDoaco}>
            <Button
              texto="Fazer Doação"
              onPress={() => setModalVisivel(true)}
              bg="#FFFFFF"
              color="#C8102E"
              paddingHorizontal={100}
            />
            <ModalDoacao
              visible={modalVisivel}
              onClose={() => setModalVisivel(false)}
              modalClose={() => setModalVisivel(false)}
            />
          </View>
        </View>
        <View style={{ marginTop: 50 }}></View>
      </ScrollView>
    </View>
  );
};
