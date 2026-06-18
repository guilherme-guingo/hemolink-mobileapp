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
  messageStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

// OBS: O componente começa com estilos próprios de cor e message, caso não passem nada de props para ele 
export const Loading = ({
  size,
  color = "blue",
  message = "Carregando dados da API. Aguarde...",
  messageStyle,
  containerStyle,
}: PropsLoading) => {
  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={messageStyle}>{message}</Text>}
    </View>
  );
};
