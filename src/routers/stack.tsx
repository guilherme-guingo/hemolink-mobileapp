import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./pagesTestes/Login";
import { ParametrosRotasStack } from "./navigation";
import { DrawerRouters } from "./drawer";

const Stack = createNativeStackNavigator<ParametrosRotasStack>();

export const StackRouters = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* OBS: INVERTER ESSA LOGICA QUANDO TIVER A PAGINA DE LOGIN */}
      <Stack.Screen name="StackHome" component={DrawerRouters} />
      <Stack.Screen name="StackLogin" component={Login} />
    </Stack.Navigator>
  );
};
