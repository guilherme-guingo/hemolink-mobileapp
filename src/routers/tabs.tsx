import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Ionicons";

import { ParametrosRotasTabs } from "./navigation";
import { Home } from "../pages/Home";
import { Perfil } from "../pages/Perfil";
import { Catalogo } from "../pages/Catalogo";
import { Administrador } from "../pages/Administrador";
import { TabBarIcon } from "../components/TabBarIcon";
import { Header } from "../components/Header";

const Tabs = createBottomTabNavigator<ParametrosRotasTabs>();

export const TabsRouters = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <Header />,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F6FAFF",
          height: 90,
          borderTopWidth: 1,
          borderColor: "#E5BDBB",
          position: "absolute",
          elevation: 0,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 90,
        },
      }}
    >
      <Tabs.Screen
        name="TabsHome"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Home"
              icon={<FontAwesome5 name="hospital" size={24} color={focused ? "#FFDAD8" : "#5C5F60"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TabsCatalogo"
        component={Catalogo}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Catálogo"
              icon={<FontAwesome5 name="list" size={22} color={focused ? "#FFDAD8" : "#5C5F60"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TabsPerfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Perfil"
              icon={<FontAwesome5 name="user" size={22} color={focused ? "#FFDAD8" : "#5C5F60"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TabsAdministrador"
        component={Administrador}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              label="Admin"
              icon={<Icon name="home-outline" size={26} color={focused ? "#FFDAD8" : "#5C5F60"} />}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};