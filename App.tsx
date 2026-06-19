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
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";


export default function App() {

  //Teste contexto+STORAGE
  function TesteDoLogin() {
    const { signIn, user, loading } = useAuth()

    useEffect(() => {
      console.log('Iniciando Login do usuario')
      signIn({ email: 'jojo@teste.com', senha: '123123' })
        .catch(e => console.log('Deu Ruim: ', e.message))
    }, [])
    useEffect(() => {
      console.log('o usuario logado é : ', user)
    })

    return null
  }


  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    // <ThemeProvider theme={theme}>
    <AuthProvider>
      <NavigationContainer>
        <Routers />
        <TesteDoLogin />
        <Toast />
      </NavigationContainer>
    </AuthProvider>

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
