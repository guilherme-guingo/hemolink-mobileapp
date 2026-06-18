import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export const Login = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Aqui é a Login</Text>
      {/* OBS: NAVEGACAO TEMPORARIA, ATE A CRIACAO DA TELA REAL DE LOGIN */}
      {/* OBS2: USAR O .REPLACE DEPOIS  */}
      <TouchableOpacity style={styles.botao}
        onPress={() => {
          navigate.navigate("StackHome");
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao}
        onPress={() => {
          navigate.navigate("StackCadastro");
        }}
      >
        <Text>Cadastra-se</Text>
      </TouchableOpacity>
    </View>
  );
};
