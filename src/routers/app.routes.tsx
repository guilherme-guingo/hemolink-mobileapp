import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerRouters } from "./drawer";
import { DetalheHospital } from "./pagesTestes/DetalheHospital";
import { ParametrosRotasApp } from "./navigation";

const AppStack = createNativeStackNavigator<ParametrosRotasApp>();

export const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="AppHome" component={DrawerRouters} />
      <AppStack.Screen name="DetalheHospital" component={DetalheHospital} />
      <AppStack.Screen name="CadastroHospital" component={DetalheHospital} />
    </AppStack.Navigator>
  );
};