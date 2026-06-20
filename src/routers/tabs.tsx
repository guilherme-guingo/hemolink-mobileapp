import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./pagesTestes/Home";
import { Perfil } from "../pages/Perfil";
import { Teste } from "./pagesTestes/Teste";
import { ParametrosRotasTabs } from "./navigation";
import { Text, View } from "react-native";
import { styles } from "./style";
import Icon from "@expo/vector-icons/Ionicons";
import { Administrador } from "./pagesTestes/Administrador";

import { ICONS } from "../icones";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

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
          // elevation: 0,
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
                focused
                  ? { backgroundColor: "#C8102E" }
                  : { backgroundColor: "" },
              ]}
            >
              {/* <Icon
                name={ICONS.home}
                size={30}
                // color={focused ? "#FDFCFE" : "#A4A3A3"}
              /> */}
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
                focused
                  ? { backgroundColor: "#C8102E" }
                  : { backgroundColor: "" },
              ]}
            >
              {/* <Icon
                name="home-outline"
                size={30}
                // color={focused ? "#FDFCFE" : "#A4A3A3"}
              /> */}
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
                focused
                  ? { backgroundColor: "#C8102E" }
                  : { backgroundColor: "" },
              ]}
            >
              {/* <Icon
                  name="home-outline"
                  size={30}
                  // color={focused ? "#FDFCFE" : "#A4A3A3"}
                /> */}
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
                // color={focused ? "#FDFCFE" : "#A4A3A3"}
              />
              <Text
                style={[
                  styles.textTabs,
                  // { color: focused ? "white" : "#E4E4E4" },
                ]}
              >
                Administrador
              </Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
