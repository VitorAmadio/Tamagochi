import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
//import MyButton from "../../components/MyButton";
import axios from "axios";
import useAuthStore from '../../functions/saveToken';
import { Image } from "react-native";
import { Button, Card } from "react-native-paper";
import { amberA100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


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
  image: {
    width: 50,
    height: 50
  },
  text: {
    color: '#000',
    fontSize: 15
  },
  cardContainer: {
    margin: 4
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textContainer: {
    gap: 6,
  },
  button: {
    flexDirection: 'row',
    padding: 2
  }

});
type item = {
  tamagotchi: {
    name: string;
    life: number;
    funLevel: number;
    id: number;
  }
}

const ListaBichinho = () => {
  const { token } = useAuthStore();
  const [name, setName] = useState<string>('');
  const [tamagochi, setTamagotchi] = useState({ pets: [] });

  const ListItem = ({ tamagotchi }: item) => {
    return (

      <SafeAreaView>
        <Card mode="contained" style={styles.cardContainer}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.textContainer}>

              <Text style={styles.text}>Nome: {tamagotchi.name}</Text>
              <Text style={styles.text}>Vida: {tamagotchi.life}</Text>
              <Text style={styles.text}>Diversão: {tamagotchi.funLevel}</Text>
              <View style={styles.button}>
                <Button mode="contained" onPress={() => console.log('Pressed')}>Editar</Button>
                <Button mode="contained-tonal" textColor={'#f00'} buttonColor={'#ff8484'} onPress={() => deletaBichinho(tamagotchi.id)}>Excluir</Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      </SafeAreaView>
    )
  }

  const deletaBichinho = async (id: number) => {

    try {
      await axios.delete('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      request();
    } catch (error) {
      Alert.alert('Erro', `${error}`, [
        { text: 'Ok', onPress: () => console.log('Ok') },
      ]);
    }
  }

  const cadastraBichinho = async () => {
    if (!name) {
      Alert.alert('Atenção', 'Insira o nome do bichinho para realizar o cadastro', [
        { text: 'OK', onPress: () => console.log('Ok') },
      ]);
      return
    }
    try {

      await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet',
        {
          name: name,
        },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      request();
      setName('');
    } catch (error) {
      Alert.alert('Erro', `${error}`, [
        { text: 'Ok', onPress: () => console.log('Ok') },
      ]);
    }
  };

  const request = useCallback(async () => {
    try {
      const { data } = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets', {

        headers: {
          'x-access-token': token
        }
      })

      setTamagotchi(data)
      //console.log(data)
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    request();
  }, [])


  return (


    <SafeAreaView style={styles.search}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput value={name} style={styles.input} placeholder="Nome do Bichinho" onChangeText={setName} />
        <Button mode="contained" onPress={() => cadastraBichinho()}>Gravar</Button>
      </View>

      <View>
        <FlatList data={tamagochi.pets} renderItem={({ item }) => <ListItem tamagotchi={item} />} />
      </View>

    </SafeAreaView>

  );
}

export default ListaBichinho;