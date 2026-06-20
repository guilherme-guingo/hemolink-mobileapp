import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export const Cadastro = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Aqui é o Cadastro</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => {
          navigate.navigate("StackHome");
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
