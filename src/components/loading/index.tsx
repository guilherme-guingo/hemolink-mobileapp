// Nota: Exemplo de implementacao quando tiver os dados vindos da API:

//  import { Loading } from "../../../components/loading";
//  <Loading size="large" messageStyle={{ fontSize: 20, justifyContent: 'center', alignItems: 'center' }} />

import {
  Text,
  View,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
} from "react-native";

interface PropsLoading {
  size: "large" | "small";
  color?: string;
  message?: string;
  messageStyleAdd?: TextStyle;
  containerStyleAdd?: ViewStyle;
}

// OBS: O componente começa com estilos próprios de cor e message, caso não passem nada de props para ele 
export const Loading = ({
  size,
  color = "blue",
  message = "Carregando dados. Aguarde...",
  messageStyleAdd,
  containerStyleAdd,
}: PropsLoading) => {
  return (
    <View style={containerStyleAdd}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={[{fontSize: 20, marginTop: 20},messageStyleAdd]}>{message}</Text>}
    </View>
  );
};
