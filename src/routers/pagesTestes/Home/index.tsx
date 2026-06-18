import { Text, View } from "react-native";
import { styles } from "./style";
// import { Loading } from "../../../components/loading";

export const Home = () => {
  return (
    <View style={styles.container}>
      {/* <Loading size="small"  messageStyle={{ fontSize: 20 }} /> */}
      <Text>Aqui é a home</Text>
    </View>
  );
};
