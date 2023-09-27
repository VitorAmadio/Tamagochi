import React from 'react';
import Login from './src/screens/Login';
import CadastroUsuario from './src/screens/create/CadastroUsuario';
import CadastraBichinho from './src/screens/create/CadastraBichinho';
import ListaBichinho from './src/screens/read/ListaBichinho';
import DeletaBichinho from './src/screens/delete/DeletaBichinho';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='CadastroUsuario' component={CadastroUsuario} />
        <Stack.Screen name='CadastraBichiho' component={CadastraBichinho} />
        <Stack.Screen name='ListaBichinho' component={ListaBichinho} />
        <Stack.Screen name='DeletaBichinho' component={DeletaBichinho} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

