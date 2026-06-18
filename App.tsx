import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/theme";
import { Routers } from "./src/routers";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { useEffect } from "react";
import { signInRequest } from "./src/services/auth";
import Toast from "react-native-toast-message";


export default function App() {

  //===== APAGAR após teste
  useEffect(() => {
    signInRequest({ email: 'teste@teste.com', senha: 'teste123' })
      .then(u => console.log('Deu bom', u))
      .catch(e => console.log('deu ruim:', e.message))
  }, [])

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    // <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Routers />
      <Toast />
    </NavigationContainer>
    // </ThemeProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
