import React, { useState } from "react";
import Checkbox from 'expo-checkbox';
import { TextInput, SafeAreaView, StyleSheet, View, Text, Alert, Image } from "react-native";
import MyButton from "../components/MyButton";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: {
    height: 50,
    width: 250,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
  },
  senha: {
    flexDirection: "row",
  },
  image: {
    width: 400,
    height: 100
  }
});

const Login = ({navigation}:any) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [useSecurity, setUseSecurity] = useState<boolean>(true);

  const styleButton = {
    width: 150,
    backgroundColor: '#274383',
    height: 60,
    borderRadius: 10,
    margin: 20,
    color: '#fff'
    
  }

  const validateLogin = () => {
    if (!login || !password) {
      Alert.alert('Erro', 'Informe o Login e a Senha para se conectar', [
        { text: 'OK', onPress: () => console.log('Ok') },
      ]);
    }else if(password.length < 6){
      Alert.alert('Erro', 'A senha deve ser maior que 6 digitos', [
        { text: 'OK', onPress: () => console.log('Ok') },
      ]);
    }else {
      alterScreen();
    }
  }

  const alterScreen = async () => {
    try {
      const {data} = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/login', {
        email: login,
        password: password
      });
      console.log('Resposta do servidor:', data);
      navigation.navigate('PrimeiraTela');
    } catch (error) {
      console.log('Erro ao fazer login:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../images/Tamagotchi.png')} style={styles.image} />
      <TextInput value={login} style={styles.input} placeholder="Usuário" onChangeText={setLogin} />
      <TextInput value={password} secureTextEntry={useSecurity} style={styles.input} placeholder="Senha" onChangeText={setPassword} />
      <View style={styles.senha}>
        <Text>Esconder Senha  </Text>
        <Checkbox value={useSecurity} onValueChange={setUseSecurity} />
      </View>

      <MyButton title="Login" onPressButton={validateLogin} containerStyle={styleButton} />
    </SafeAreaView>
  );
};

export default Login;
