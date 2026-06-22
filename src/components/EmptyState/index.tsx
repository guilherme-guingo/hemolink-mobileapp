
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";

interface PropsEmptyState {
  message?: string;
  messageStyle?: TextStyle;
  containerStyle?: ViewStyle;
  lottieStyle?: StyleProp<ViewStyle>;
  source?: string | AnimationObject;
}
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
