
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
