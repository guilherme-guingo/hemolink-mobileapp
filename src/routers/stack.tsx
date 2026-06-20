import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./pagesTestes/Login";
import { ParametrosRotasStack } from "./navigation";
import { DrawerRouters } from "./drawer";
import { Cadastro } from "./pagesTestes/Cadastro";
import { DetalheHospital } from "./pagesTestes/DetalheHospital";

const Stack = createNativeStackNavigator<ParametrosRotasStack>();

export const StackRouters = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StackLogin" component={Login} />
      <Stack.Screen name="StackCadastro" component={Cadastro} />
      <Stack.Screen name="StackHome" component={DrawerRouters} />
      <Stack.Screen name="StackDetalheHospital" component={DetalheHospital} />
      <Stack.Screen name="StackCadastroHospital" component={DetalheHospital} />
    </Stack.Navigator>
  );
};
