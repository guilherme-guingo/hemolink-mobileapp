import React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { TabsRouters } from "./tabs";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ParametrosRotasDrawer } from "./navigation";
import { LojaDePontos } from "../pages/LojaDePontos";

const Drawer = createDrawerNavigator<ParametrosRotasDrawer>();

const CustomizacaoDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, backgroundColor: "#f4f4f4" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Menu</Text>
      </View>
      
      <DrawerItem
        label="Início"
        icon={({ color, size }) => <Feather name="home" color={color} size={size} />}
        onPress={() => props.navigation.navigate("DrawerHome", { screen: "TabsHome" })}
      />
      <DrawerItem
        label="Catálogo"
        icon={({ color, size }) => <Feather name="list" color={color} size={size} />}
        onPress={() => props.navigation.navigate("DrawerHome", { screen: "TabsCatalogo" })}
      />
      <DrawerItem
        label="Perfil"
        icon={({ color, size }) => <Feather name="user" color={color} size={size} />}
        onPress={() => props.navigation.navigate("DrawerHome", { screen: "TabsPerfil" })}
      />
      <DrawerItem
        label="Loja de Pontos"
        icon={({ color, size }) => <Feather name="gift" color={color} size={size} />}
        onPress={() => props.navigation.navigate("DrawerLojaDePontos")}
      />
    </DrawerContentScrollView>
  );
};

export const DrawerRouters = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomizacaoDrawer {...props} />}
    >
      <Drawer.Screen name="DrawerHome" component={TabsRouters} />
      <Drawer.Screen name="DrawerLojaDePontos" component={LojaDePontos} />
    </Drawer.Navigator>
  );
};