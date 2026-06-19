import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Text,
  TextStyle,
  View,
} from "react-native";
import { styles } from "./style";

interface PropsCardBase {
  // OBS: ANY POR ENQUANTO
  source?: any;
  state?: string;
  city?: string;
  name?: string;
  nameStyleAdd?: TextStyle;
  cityStyleAdd?: TextStyle;
  stateStyleAdd?: TextStyle;
  sourceStyleAdd?: ImageStyle;
}

export const CardBaseCatalogo = ({
  source,
  state,
  city,
  name,
  sourceStyleAdd,
  cityStyleAdd,
  nameStyleAdd,
  stateStyleAdd,
}: PropsCardBase) => {
  return (
    <View style={styles.container}>
      <View style={[styles.containerImagem]}>
        {source && (
          <Image
            style={[styles.imagem, sourceStyleAdd]}
            source={{ uri: source }}
          />
        )}
      </View>
        {name && <Text style={[nameStyleAdd]}>{name}</Text>}
      <View style={styles.containerEndereco}>
        {city && <Text style={[cityStyleAdd]}>{city}</Text>}
        {state && <Text style={[stateStyleAdd]}>{state}</Text>}
      </View>
    </View>
  );
};
