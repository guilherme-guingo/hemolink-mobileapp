import { Text, View } from "react-native";
import { styles } from "./style";
import { Header } from "../../../components/Hearder";
// import { EmptyState } from "../../../components/EmptyState";
// import { Loading } from "../../../components/loading";
// import teste from "../../../assets/animacoes/EmptyBox.json"

export const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        {/* <Loading size="small"  messageStyle={{ fontSize: 20 }} /> */}
        {/* <EmptyState source={require("../../assets/animacoes/EmptyBox.json")}/> */}
        <Text>Aqui é a home</Text>
      </View>
    </View>
  );
};
