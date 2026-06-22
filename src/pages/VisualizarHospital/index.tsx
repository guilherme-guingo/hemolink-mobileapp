import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParametrosRotasApp } from "../../routers/navigation";
import { Hospital, buscarHospital } from "../../services/HospitalService";
import { CardDetalheHospital } from "../../components/CardDetalheHospital";
import { Button } from "../../components/Button";
import { BackButton } from "../../components/BackButton";
import { theme } from "../../theme";
import { styles } from "./style";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import { ModalAgendarDoacao } from "../../components/ModalAgendarDoacao";


type Props = NativeStackScreenProps<ParametrosRotasApp, "VisualizarHospital">;

interface Coordenadas {
  latitude: number;
  longitude: number;
}

export const VisualizarHospital = ({ route, navigation }: Props) => {
  const id = route.params?.id;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalAgendarVisivel, setModalAgendarVisivel] = useState(false);

  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);

  useEffect(() => {
    buscarHospital(id)
      .then((res) => {
        const hospitalData = res.data;
        setHospital(hospitalData);
        buscarCoordenadasPorEndereco(hospitalData);
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Erro ao carregar detalhes",
          text2: "Não foi possível carregar as informações deste hospital.",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const buscarCoordenadasPorEndereco = async (hosp: Hospital) => {
    try {
      const enderecoBusca = `${hosp.address}, ${hosp.city}, ${hosp.state}, Brasil`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoBusca)}&limit=1`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": "HemoLinkApp/1.0",
        },
      });
      const data = await response.json();

      if (data && data.length > 0) {
        setCoordenadas({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        });
      } else {
        buscarCoordenadasPorCEP(hosp.cep);
      }
    } catch{
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao buscar coordenadas",
      });
    }
  };

  const buscarCoordenadasPorCEP = async (cep: string) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`;
      const response = await fetch(url, {
        headers: { "User-Agent": "HemoLinkApp/1.0" },
      });
      const data = await response.json();

      if (data && data.length > 0) {
        setCoordenadas({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao buscar credenciais do mapa",
      });
    }
  };

  const handleFavoritar = () => {
    Alert.alert("Sucesso", "Hospital adicionado aos favoritos com sucesso!", [
      { text: "OK", style: "default" },
    ]);
  };

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

        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Localização</Text>

          {coordenadas ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: coordenadas.latitude,
                  longitude: coordenadas.longitude,
                }}
                title={hospital.name}
                description={hospital.address}
              />
            </MapView>
          ) : (
            <View style={[styles.map, styles.center]}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={{ marginTop: 10, color: "#666" }}>
                Carregando mapa...
              </Text>
            </View>
          )}
        </View>

        <View style={styles.acoes}>
          <Button
            texto="Agendar Doação"
            onPress={() => setModalAgendarVisivel(true)}
            bg={theme.colors.primary}
            color="#fff"
          />
          <View style={{ height: 10 }} />
          <Button
            texto="Favoritar Hospital"
            onPress={handleFavoritar}
            bg="#fff"
            color={theme.colors.primary}
            borderColor={theme.colors.primary}
          />
        </View>
      </ScrollView>
      
      <ModalAgendarDoacao
        visible={modalAgendarVisivel}
        onClose={() => setModalAgendarVisivel(false)}
        hospitalId={String(hospital.id)}
        hospitalNome={hospital.name}
      />

    </View>
  );
};
