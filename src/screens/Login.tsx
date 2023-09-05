import React, { useState } from "react";
import Checkbox from 'expo-checkbox';
import { TextInput, SafeAreaView, StyleSheet, View, Text, Alert } from "react-native";
import MyButton from "../components/MyButton";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: 250,
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 2,
        margin: 10,
    },
    senha:{
        flexDirection: "row",
        
    }
});

const Login = () => {
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [useSecurity, setUseSecurity] = useState<boolean>(true);

    const styleButton = {
        width:150,
        backgroundColor:'#274383',
        height:60,
        borderRadius:10,
        margin:20
    }

    const validateLogin = ()=>{
        if (!login || !password){
            Alert.alert('Erro', 'Informe o Login e a Senha para se conectar', [
                {text: 'OK', onPress: () => console.log('Ok')},
              ]);
        }
    }
    const alterScreen = ()=>{
        validateLogin()
    }


    return (
        <SafeAreaView style={styles.container}>
            <TextInput value={login} style={styles.input} placeholder="Username" onChangeText={setLogin} />
            <TextInput value={password} secureTextEntry={useSecurity} style={styles.input} placeholder="Password" onChangeText={setPassword} />
            <View style={styles.senha}>
                <Text>Esconder Senha  </Text>
                <Checkbox value={useSecurity} onValueChange={setUseSecurity}/>
            </View>
            
            <MyButton title="Login" onPressButton={alterScreen} containerStyle={styleButton} />

        </SafeAreaView>
    );
};

export default Login;