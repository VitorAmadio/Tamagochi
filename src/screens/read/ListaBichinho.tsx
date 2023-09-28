import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
//import MyButton from "../../components/MyButton";
import axios from "axios";
import useAuthStore from '../../functions/saveToken';
import { Image } from "react-native";

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
      width: 50,
      height: 50
    },
    text:{
      color: '#000',
      fontSize:20
    }
  });
type item ={
  tamagotchi:{
    name: string;
    life: number;
  }
}
const ListItem = ({tamagotchi}:item) =>{
  return( 
    <TouchableOpacity>
      <Text style={styles.text}>{tamagotchi.name}</Text>
      <Text style={styles.text}>{tamagotchi.life}</Text>
    </TouchableOpacity>
  )
}
const ListaBichinho = () => {
    const {token} = useAuthStore();
    const [nameSearch, setNameSearch] = useState<string>('');
    const [tamagochi, setTamagotchi] = useState({pets: []});

    const request = useCallback(async () => {
        try{
              const {data} = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets',{

              headers:{
                'x-access-token': token
              } 
              })

            setTamagotchi(data)
            //console.log(data)
        }catch(error){
            console.log(error);
        }
    },[])

    useEffect(() => {
        request();
    },[])


    return (
        <SafeAreaView style={styles.search}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput value={nameSearch} style={styles.input} placeholder="Nome do Bichinho" onChangeText={setNameSearch} />
              <TouchableOpacity>
                  <Image source={require('../../images/lupa.png')} style={styles.image} />
              </TouchableOpacity>
          </View>
    
          <View>
              <FlatList data={tamagochi.pets} renderItem={({item}) => <ListItem tamagotchi={item}/>}/>
          </View>
        </SafeAreaView>
  
    );
}

export default ListaBichinho;