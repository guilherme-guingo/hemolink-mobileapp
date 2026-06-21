import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/theme";
import { Routers } from "./src/routers";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useEffect } from "react";
import { signInRequest } from "./src/services/auth";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import { Catalogo } from "./src/pages/Catalogo";
import { Home } from "./src/pages/Home";
import { Perfil } from "./src/pages/Perfil";
import { FavoritosProvider } from "./src/contexts/FavoritosContext";

//teste perfil abrir camera e escolher da galeria
//export default function App() {
//  return <Perfil />;
//}

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FavoritosProvider>
          <NavigationContainer>
            <Routers />
            {/* <Catalogo /> */}
            {/* <Home /> */}
            {/*<Perfil/> */}
            <Toast />
          </NavigationContainer>
        </FavoritosProvider>
      </AuthProvider>
    </ThemeProvider>
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
