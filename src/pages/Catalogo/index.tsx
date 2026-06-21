import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import { Input } from "../../components/Input";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useEffect, useState } from "react";
import { Hospital, listarHospitais } from "../../services/HospitalService";
import { Loading } from "../../components/loading";
import { EmptyState } from "../../components/EmptyState";
import { CardBaseCatalogo } from "../../components/CardBaseCatalogo";
import { obterBloodStock } from "../../util/obterBloodStock";
import { obterTiposSanguineosCriticos } from "../../util/obterTiposSanguineosCriticos";
import { Button } from "../../components/Button";

export const Catalogo = () => {
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isDados, setIsDados] = useState<Boolean>(false);
  const [filter, setFilter] = useState('')

  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("1");
  const botoesFiltros = [
    { id: "1", nome: "Todos" },
    { id: "2", nome: "Urgência Crítica" },
    { id: "3", nome: "Mais Próximos" },
    { id: "4", nome: "Favoritos" },
  ];

  async function carregarInformacoes() {
    setIsLoading(true);
    // NOTA: FALTA VERIFICACAO DA CHEGADA DOS DADOS DA API + TOAST DE ERRO, CASO HAJA
    const response = await listarHospitais();
    if (response.status !== 200) {
      // toast.error("Erro ao carregar as informações");
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setHospitais(response.data);
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

  const hospitaisFiltrados = hospitais.filter((hospital) => {
    const textoFiltro = filter.toLowerCase().trim();
    if (textoFiltro) {
      const matchNome = hospital.name.toLowerCase().includes(textoFiltro);
      const matchCidade = hospital.city.toLowerCase().includes(textoFiltro);
      if (!matchNome && !matchCidade) return false;
    }

    if (filtroSelecionado === "2") {
      const { percentage } = obterBloodStock(hospital.bloodStock);
      return percentage <= 30;
    }

    return true;
  });

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
                  value={filter}
                  onChangeText={setFilter}
                  placeholder="Buscar hospitais ou cidades..."
                  iconLeft={<EvilIcons name="search" size={24} color="black"   />}
                  // falta colocar um height e um borderColor talvez
                />
              </View>
            </View>
            
            <FlatList
              data={botoesFiltros}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({ item }) => {
                const ativo = item.id === filtroSelecionado;
                return (
                  <View style={{ marginRight: 8 }}>
                    {" "}
                    <Button
                      texto={item.nome}
                      onPress={() => setFiltroSelecionado(item.id)}
                      bg={ativo ? "#CE0C2C" : "#E2E8F0"}
                      color={ativo ? "#FFFFFF" : "#475569"}
                    />
                  </View>
                );
              }}
            />

            <View style={styles.containerCard}>
              <FlatList
                data={hospitaisFiltrados}
                contentContainerStyle={{
                  paddingBottom: 20,
                  gap: 12,
                }}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => {
                  const { percentage } = obterBloodStock(item.bloodStock);
                  const tipoCritico = obterTiposSanguineosCriticos(
                    item.bloodStock,
                  );
                  return (
                    <CardBaseCatalogo
                      tipoCritico={tipoCritico}
                      percentage={percentage}
                      source={item.image}
                      city={item.city}
                      state={item.state}
                      name={item.name}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
