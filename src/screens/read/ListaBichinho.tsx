import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import useAuthStore from '../../functions/saveToken';
import { Button, Card, Dialog, PaperProvider, Portal } from "react-native-paper";


const styles = StyleSheet.create({
  cadastro: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5
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

const ListaBichinho = ({ navigation }: any) => {
  const { token } = useAuthStore();
  const [name, setName] = useState<string>('');
  const [idBichinho, setIdBichinho] = useState<number>(0);
  const [tamagochi, setTamagotchi] = useState({ pets: [] });
  const [visible, setVisible] = useState<boolean>(false);
  const [nomeAtualizado, setNomeAtualizado] = useState<string>('');

  const ListItem = ({ tamagotchi }: item) => {
    return (

      <TouchableOpacity onPress={() => { navigation.navigate('DetalhesBichinho', { id: tamagotchi.id }) }}>
        <Card mode="contained" style={styles.cardContainer}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Nome: {tamagotchi.name}</Text>
              <Text style={styles.text}>Vida: {tamagotchi.life}</Text>
              <Text style={styles.text}>Diversão: {tamagotchi.funLevel}</Text>
              <View style={styles.button}>
                <Button mode="contained" onPress={() => showDialog(tamagotchi.id)} textColor={'#008080'}>Editar</Button>
                <Button mode="contained-tonal" textColor={'#f00'} buttonColor={'#ff8484'} onPress={() => deletaBichinho(tamagotchi.id)}>Excluir</Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }
  const showDialog = (id: number) => {
    setIdBichinho(id);
    if (id === 0) {
      return;
    }
    setVisible(true);
  };

  const viewDetails = (id: number) => {


  }

  const hideDialog = () => {
    setVisible(false);
    setIdBichinho(0);
    setNomeAtualizado('');
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

  const atualizaBichinho = async () => {
    try {
      await axios.put('https://tamagochiapi-clpsampedro.b4a.run/pet/' + idBichinho,
        {
          name: nomeAtualizado,
        },
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
    } finally {
      hideDialog();
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
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    request();
  }, [])


  return (


    <>
      <SafeAreaView style={styles.cadastro} >
        <Button mode="contained" onPress={() => { navigation.navigate('Login') }} textColor={'#f00'} buttonColor={'#ff8484'}>Logout</Button>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput value={name} style={styles.input} placeholder="Nome do Bichinho" onChangeText={setName} />
          <Button mode="contained" onPress={() => cadastraBichinho()} textColor={'#008080'}>Gravar</Button>
        </View>

        <View>
          <FlatList data={tamagochi.pets} renderItem={({ item }) => <ListItem tamagotchi={item} />} />
        </View>

      </SafeAreaView>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Editar</Dialog.Title>
          <Dialog.Content>
            <TextInput value={nomeAtualizado} style={styles.input} placeholder="Novo Nome" onChangeText={setNomeAtualizado} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => atualizaBichinho()} textColor={'#000'}>Salvar</Button>
            <Button onPress={() => hideDialog()} textColor={'#000'}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>

  );
}

export default ListaBichinho;