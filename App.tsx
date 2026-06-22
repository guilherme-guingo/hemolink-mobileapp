import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { theme } from './src/theme';
import { AuthProvider } from './src/contexts/AuthContext';
import { FavoritosProvider } from './src/contexts/FavoritosContext';
import { Routers } from './src/routers';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FavoritosProvider>
          <NavigationContainer>           
            <Routers />
            <Toast />
          </NavigationContainer>
        </FavoritosProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}