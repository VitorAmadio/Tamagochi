import React, { useState } from "react";
import Checkbox from 'expo-checkbox';
import { TextInput, SafeAreaView, StyleSheet } from "react-native";
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
});

const Login = () => {
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [useSecurity, setUseSecurity] = useState<boolean>(true);

    const alterScreen = ()=>{

    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput value={login} style={styles.input} placeholder="Username" />
            <TextInput value={password} secureTextEntry={useSecurity} style={styles.input} placeholder="Password" />
            <Checkbox
            value={useSecurity}
            onValueChange={setUseSecurity}
            />
            <MyButton title="Login" onPressButton={alterScreen} color="#f55" />

        </SafeAreaView>
    );
};

export default Login;
//<TouchableOpacity onPress={togglePasswordVisibility}>
 //               <EyeIcon name={useSecurity ? "visibility-off" : "visibility"} size={50} /> 
  //          </TouchableOpacity>