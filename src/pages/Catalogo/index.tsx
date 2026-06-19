import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import { Header } from "../../components/Hearder";
import { Input } from "../../components/Input";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useEffect, useState } from "react";
import { Hospital, listarHospitais } from "../../services/HospitalService";
import { Loading } from "../../components/loading";
import { EmptyState } from "../../components/EmptyState";
import { CardBaseCatalogo } from "../../components/CardBaseCatalogo";

export const Catalogo = () => {
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isDados, setIsDados] = useState<Boolean>(false);

  async function carregarInformacoes() {
    setIsLoading(true);
    // NOTA: FALTA VERIFICACAO DA CHEGADA DOS DADOS DA API + TOAST DE ERRO, CASO HAJA
    const response = await listarHospitais();
    // if (response.status !== 200) {
    //   // toast.error("Erro ao carregar as informações");
    //   setIsLoading(false);
    //   return;
    // }
    setTimeout(() => {
      setHospitais(response);
      // setResultadoFiltro(response.data);
      setIsLoading(false);
      setIsDados(true);
    }, 0);
    console.log(response);
  }
  useEffect(() => {
    carregarInformacoes();
  }, []);

  // useEffect(() => {
  //   const getAllHospitais = async () => {
  //     try {
  //       const hospitais = await listarHospitais();
  //       setHospitais(hospitais);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getAllHospitais();
  // }, []);

  return (
    <View style={styles.containerMain}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Loading size="large" />
        </View>
      ) : isDados && hospitais.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containerTitulo}>
              <View style={styles.containerTituloFilho}>
                <Text style={styles.title}>Sua jornada salva vidas</Text>
                <Text style={styles.subTitle}>
                  Encontre o local ideal para sua próxima doação
                </Text>
              </View>
              <View style={styles.containerInput}>
                <Input
                  value=""
                  placeholder="Buscar hospitais ou cidades..."
                  iconLeft={<EvilIcons name="search" size={24} color="black" />}
                  // falta colocar um height e um borderColor talvez
                />
              </View>
            </View>
            {/* <TouchableOpacity
            style={{
              borderColor: "black",
              borderWidth: 2,
              height: 50,
              marginBottom: 50,
            }}
          /> */}

            <View style={styles.containerCard}>
              <FlatList
                data={hospitais}
                contentContainerStyle={{
                  paddingBottom: 20,
                  gap: 12,
                }}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <CardBaseCatalogo
                    source={item.image}
                    city={item.city}
                    state={item.state}
                    name={item.name}
                  />
                )}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
