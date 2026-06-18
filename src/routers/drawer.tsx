import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TabsRouters } from "./tabs";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Perfil } from "./pagesTestes/Perfil";
import { Teste } from "./pagesTestes/Teste";

const Drawer = createDrawerNavigator();

//talvez importar esse componente em um arquivo(segregar ele desse arquivo)
const CustimizacaoDrower = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, backgroundColor: "#f4f4f4" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Menu</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export const DrawerRouters = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ title: "" }}
      drawerContent={(props) => <CustimizacaoDrower {...props} />}
    >
      <Drawer.Screen
        name="DrowerHome"
        component={TabsRouters}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          drawerLabel: "Início",
        }}
      />
      <Drawer.Screen
        name="DrowerPerfil"
        component={Perfil}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          drawerLabel: "Perfil",
        }}
      />
      <Drawer.Screen
        name="DrowerTeste"
        component={Teste}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          drawerLabel: "Teste",
        }}
      />
    </Drawer.Navigator>
  );
};
