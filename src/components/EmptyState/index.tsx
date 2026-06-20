// Nota: esse componente sera usado para: Ex:
//  -Busca sem resultados;
//  -Lista vazia;
//  -Dados vindos da API vazios;
//  -Nenhum favorito salvo;
//  -Você não possui notificações.

// Nota: Exemplo de implementacao:

//  import { EmptyState } from "../../../components/EmptyState";
//  <EmptyState message={"Nao há dados para esse filtro"} messageStyle={{fontSize:20}} />
//  <EmptyStatesource={require(".../seiLa.json")} />
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";

interface PropsEmptyState {
  message?: string;
  messageStyle?: TextStyle;
  containerStyle?: ViewStyle;
  lottieStyle?: StyleProp<ViewStyle>;
  source?: string | AnimationObject;
}

// OBS: O componente começa com estilos próprios de tamanho da animaçao + caminho da animacao no arquivo assets, caso não passem nada de props para ele
export const EmptyState = ({
  message,
  containerStyle,
  messageStyle,
  source = require("../../assets/animacoes/EmptyBox.json"),
  lottieStyle = { width: 200, height: 200 },
}: PropsEmptyState) => {
  return (
    <View style={[containerStyle]}>
      <LottieView source={source} autoPlay loop style={lottieStyle} />
      {message && <Text style={[messageStyle]}>{message}</Text>}
    </View>
  );
};
