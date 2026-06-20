import { ScrollView, Text, View } from "react-native";
import { Header } from "../../components/Hearder";
import { styles } from "./style";
import { FontAwesome } from "@expo/vector-icons";

export const Home = () => {
  return (
    <View style={styles.containerMain}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerTitulo}>
          <View style={styles.containerTituloFilho}>
            <Text style={styles.title}>Olá, "usuário" 😆</Text>
            <Text style={styles.subTitle}>
              Seu gesto salva vidas todos os dias.
            </Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <Text>SEU IMPACTO</Text>
            <FontAwesome name="heart" size={24} color="#FFE4E6" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
