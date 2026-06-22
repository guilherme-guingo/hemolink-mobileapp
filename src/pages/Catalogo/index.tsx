import { FlatList, Text, View, TouchableOpacity } from "react-native";
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
import { useNotifications } from "../../hooks/useNotification";
import { enviarNotificacaoPromo } from "../../services/notifications";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParametrosRotasApp } from "../../routers/navigation";

type NavegacaoProps = NativeStackNavigationProp<ParametrosRotasApp>;

export const Catalogo = () => {
  useNotifications(10, enviarNotificacaoPromo);
  const navigation = useNavigation<NavegacaoProps>();
  const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDados, setIsDados] = useState<boolean>(false);
  const [filter, setFilter] = useState("");
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("1");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const botoesFiltros = [
    { id: "1", nome: "Todos" },
    { id: "2", nome: "Urgência Crítica" },
    { id: "3", nome: "Mais Próximos" },
    { id: "4", nome: "Favoritos" },
  ];

  async function carregarInformacoes() {
    setIsLoading(true);
    try {
      const response = await listarHospitais();
      if (response.status !== 200) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Erro ao carregar dados",
          text2: "Não foi possível buscar a lista de hospitais.",
        });
        return;
      }
      setHospitais(response.data);
      setIsDados(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Falha na conexão",
        text2: "Verifique sua internet ou tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      const response = await listarHospitais();
      if (response.status === 200) {
        setHospitais(response.data);
        setIsDados(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao atualizar",
          text2: "Não foi possível atualizar a lista.",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Falha na atualização",
        text2: "Não foi possível conectar ao servidor.",
      });
    } finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    carregarInformacoes();
  }, []);

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

  const renderHeader = () => (
    <View>
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
            iconLeft={<EvilIcons name="search" size={24} color="black" />}
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
          marginBottom: 20,
        }}
        renderItem={({ item }) => {
          const ativo = item.id === filtroSelecionado;
          return (
            <View style={{ marginRight: 8 }}>
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
    </View>
  );

  return (
    <View style={styles.containerMain}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Loading size="large" />
        </View>
      ) : isDados && hospitais.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={hospitaisFiltrados}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader()}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={{
            paddingBottom: 20,
            gap: 12,
          }}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={() => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <EmptyState />
              <Text>Nenhum hospital encontrado para os filtros aplicados.</Text>
            </View>
          )}
          renderItem={({ item }) => {
            const { percentage } = obterBloodStock(item.bloodStock);
            const tipoCritico = obterTiposSanguineosCriticos(item.bloodStock);
            return (
              <TouchableOpacity
                style={styles.containerCard}
                onPress={() =>
                  navigation.navigate("VisualizarHospital", {
                    id: String(item.id),
                  })
                }
                activeOpacity={0.8}
              >
                <CardBaseCatalogo
                  tipoCritico={tipoCritico}
                  percentage={percentage}
                  source={item.image}
                  city={item.city}
                  state={item.state}
                  name={item.name}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View style={{ marginTop: 70 }}></View>
    </View>
  );
};
