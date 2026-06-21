import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/Ionicons";
import { ParametrosRotasTabs } from "./navigation";
import { styles } from "./style";
import { Home } from "./pagesTestes/Home";
import { Perfil } from "../pages/Perfil";
import { Teste } from "./pagesTestes/Teste";
import { Administrador } from "./pagesTestes/Administrador";

const Tabs = createBottomTabNavigator<ParametrosRotasTabs>();

export const TabsRouters = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F6FAFF",
          height: 90,
          borderTopWidth: 1,
          position: "absolute",
          borderColor: "#E5BDBB",
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="TabsHome"
        component={Home}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.cardTabs,
                focused ? { backgroundColor: "#C8102E" } : { backgroundColor: "transparent" },
              ]}
            >
              <FontAwesome5
                name="hospital"
                size={27}
                color={focused ? "#FFDAD8" : "#5C5F60"}
              />
              <Text
                style={[styles.textTabs, { color: focused ? "#FFDAD8" : "#5C5F60" }]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="TabsTeste"
        component={Teste}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.cardTabs,
                focused ? { backgroundColor: "#C8102E" } : { backgroundColor: "transparent" },
              ]}
            >
              <AntDesign
                name="home"
                size={25}
                color={focused ? "#FFDAD8" : "#5C5F60"}
              />
              <Text
                style={[styles.textTabs, { color: focused ? "#FFDAD8" : "#5C5F60" }]}
              >
                Teste
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="TabsPerfil"
        component={Perfil}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.cardTabs,
                focused ? { backgroundColor: "#C8102E" } : { backgroundColor: "transparent" },
              ]}
            >
              <FontAwesome5
                name="user"
                size={24}
                color={focused ? "#FFDAD8" : "#5C5F60"}
              />
              <Text
                style={[styles.textTabs, { color: focused ? "#FFDAD8" : "#5C5F60" }]}
              >
                Perfil
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="TabsAdministrador"
        component={Administrador}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.cardTabs}>
              <Icon
                name="home-outline"
                size={30}
                color={focused ? "#FFDAD8" : "#5C5F60"}
              />
              <Text style={styles.textTabs}>
                Administrador
              </Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};