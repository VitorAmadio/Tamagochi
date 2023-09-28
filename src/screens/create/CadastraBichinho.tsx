import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput } from "react-native";
import MyButton from "../../components/MyButton";
import axios from "axios";
import useAuthStore from '../../functions/saveToken';

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
    image: {
      width: 400,
      height: 100
    }
  });


const CadastraBichinho = () => {
    const [name, setName] = useState<string>(''); 
    const { token } = useAuthStore();
    const styleButton = {
        width: 300,
        backgroundColor: '#274383',
        height: 60,
        borderRadius: 10,
        margin: 20,
        color: '#fff'
    }
    
    const register = async () => {
        try {
            const { data } = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet',
                {
                    name: name,
                },
                {
                    headers: {  
                        'x-access-token': token,
                    },
                }
            );
            Alert.alert('Sucesso', 'Bichinho cadastrado com sucesso', [
                { text: 'OK', onPress: () => console.log('Ok') },
            ]);
            setName('');
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }
    };
    return (
        <SafeAreaView style={styles.container} >
             <TextInput value={name} style={styles.input} placeholder="Nome do Bichinho" onChangeText={setName} />
             <MyButton title="Cadastrar" onPressButton={() => { register(); } } containerStyle={styleButton} />
        </SafeAreaView>
    );
}

export default CadastraBichinho;