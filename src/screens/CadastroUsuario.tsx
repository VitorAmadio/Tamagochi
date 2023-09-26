import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
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
  
const CadastroUsuario = ({route}:any) => {
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
    const validateRegister = () => {
        if (!login || !password) {
          Alert.alert('Erro', 'Informe o Login e a Senha para se cadastrar', [
            { text: 'OK', onPress: () => console.log('Ok') },
          ]);
          return
        } else{
          
            if (password.length >= 6) {
              registerUser();
            }else{
              Alert.alert('Erro', 'A senha deve ser maior que 6 digitos', [
                { text: 'OK', onPress: () => console.log('Ok') },
              ]);
            }
        }

      }
      const registerUser = async () => {
        try {
          const {data} = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/register', {
            email: login,
            password: password,
          });
          Alert.alert('Sucesso', `${data}`, [
            { text: 'OK', onPress: () => console.log('Ok') },
          ]);
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
              ]);
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput value={login} style={styles.input} placeholder="E-mail" onChangeText={setLogin} />
            <TextInput value={password} secureTextEntry={useSecurity} style={styles.input} placeholder="Senha" onChangeText={setPassword} />
            <MyButton title="Cadastrar" onPressButton={validateRegister} containerStyle={styleButton} />
    </SafeAreaView>
    );
}

export default CadastroUsuario;