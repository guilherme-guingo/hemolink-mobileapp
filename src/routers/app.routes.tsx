import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerRouters } from "./drawer";
import { DetalheHospital } from "../pages/DetalheHospital";
import { VisualizarHospital } from "../pages/VisualizarHospital";
import { ParametrosRotasApp } from "./navigation";
import { DoacaoForm } from "../pages/DoacaoForm";
import { PedidoForm } from "../pages/PedidoForm";

const AppStack = createNativeStackNavigator<ParametrosRotasApp>();

export const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="AppHome" component={DrawerRouters} />
      <AppStack.Screen name="DetalheHospital" component={DetalheHospital} />
      <AppStack.Screen name="CadastroHospital" component={DetalheHospital} />
      <AppStack.Screen name="VisualizarHospital" component={VisualizarHospital} />
      <AppStack.Screen name="DoacaoForm" component={DoacaoForm}
        options={{ presentation: 'modal', headerShown: true, title: 'Quero doar' }}
      />
      <AppStack.Screen name="PedidoForm" component={PedidoForm}
        options={{ presentation: 'modal', headerShown: true, title: 'Preciso de doação' }}
      />  
    </AppStack.Navigator>
  );
};