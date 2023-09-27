import React, { useCallback, useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput } from "react-native";
import MyButton from "../../components/MyButton";
import axios from "axios";
import useAuthStore from '../../functions/saveToken';

const styles = StyleSheet.create({
    search: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    input: {
      height: 50,
      width: 250,
      borderRadius: 5,
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
const ListaBichinho = () => {
    const {token} = useAuthStore();
    const [nameSearch, setNameSearch] = useState<string>('');

    const request = useCallback(async () => {
        try{
            const {data} = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets')
            console.log(data)
        }catch(error){
            console.log(error);
        }
    },[])

    useEffect(() => {
        request();
    },[])


    return (
        <SafeAreaView style={styles.search}>
            <TextInput value={nameSearch} style={styles.input} placeholder="Nome do Bichinho" onChangeText={setNameSearch} />
        </SafeAreaView>
    );
}

export default ListaBichinho;