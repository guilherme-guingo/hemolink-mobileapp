import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParametrosRotasDrawer } from "../../routers/navigation";

type DrawerProps = DrawerNavigationProp<ParametrosRotasDrawer>;

export const Header = () => {
  const navigation = useNavigation<DrawerProps>();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={33} color="#A3001B" />
      </TouchableOpacity>
      <Text style={styles.title}>HemoLink</Text>
    </View>
  );
};
