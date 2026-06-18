import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./pagesTestes/Home";
import { Perfil } from "./pagesTestes/Perfil";
import { Teste } from "./pagesTestes/Teste";
import { ParametrosRotasTabs } from "./navigation";
import { Text, View } from "react-native";
import { styles } from "./style";
import Icon from "@expo/vector-icons/Ionicons";

const Tabs = createBottomTabNavigator<ParametrosRotasTabs>();

export const TabsRouters = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "aqua",
          height: 90,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="TabsHome"
        component={Home}
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
                Home
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
                Perfil
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
                Teste
              </Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
