import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import MyButton from "../../components/MyButton";
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
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const clearInput = ()=>{
      setLogin('');
      setPassword('');
      setConfirmPassword('');

    }

    const styleButton = {
        width: 150,
        backgroundColor: '#274383',
        height: 60,
        borderRadius: 10,
        margin: 20,
        color: '#fff'
    }
    const validateRegister = () => {
        if (!login || !password || !confirmPassword) {
          Alert.alert('Erro', 'Informe o Login e confirme a senha para se cadastrar', [
            { text: 'OK', onPress: () => console.log('Ok') },
          ]);
          return
        } else{
            if(password != confirmPassword){
              Alert.alert('Erro', 'As senhas devem ser iguais ', [
                { text: 'OK', onPress: () => console.log('Ok') },
              ]);
              return
            }
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
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso', [
            { text: 'OK', onPress: () => console.log('Ok') },
          ]);
          clearInput()
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
              ]);
        }
      };

    return (
      
        <SafeAreaView style={styles.container}>
            <TextInput value={login} style={styles.input} placeholder="E-mail" onChangeText={setLogin} />
            <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder="Senha" onChangeText={setPassword} />
            <TextInput value={confirmPassword} secureTextEntry={true} style={styles.input} placeholder="Confirme a Senha" onChangeText={setConfirmPassword} />
            <MyButton title="Cadastrar" onPressButton={validateRegister} containerStyle={styleButton} />
    </SafeAreaView>
    );
}

export default CadastroUsuario;