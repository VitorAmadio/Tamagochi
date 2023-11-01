import React from 'react';
import Login from './src/screens/Login';
import CadastroUsuario from './src/screens/create/CadastroUsuario';
import CadastraBichinho from './src/screens/create/CadastraBichinho';
import ListaBichinho from './src/screens/read/ListaBichinho';
import DeletaBichinho from './src/screens/delete/DeletaBichinho';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import { colors } from './src/util/color';
import DetalhesBichinho from './src/screens/read/DetalhesBichinho';

const theme = {
  ...DefaultTheme,

  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    surfaceVariant: colors.surfaceVariant,
    text: colors.text
  }
}
const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='CadastroUsuario' component={CadastroUsuario} />
          <Stack.Screen name='CadastraBichinho' component={CadastraBichinho} />
          <Stack.Screen name='ListaBichinho' component={ListaBichinho} />
          <Stack.Screen name='DetalhesBichinho' component={DetalhesBichinho} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

