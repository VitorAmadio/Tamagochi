import React, { useEffect } from "react";
import useAuthStore from '../functions/saveToken';
import { Alert, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../components/MyButton";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

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
const Home = ({ navigation }: any) => {
  const { token } = useAuthStore();

  const styleButton = {
    width: 300,
    backgroundColor: '#274383',
    height: 60,
    borderRadius: 10,
    margin: 20,
    color: '#fff'
  }

  const validateLogin = () => {
    if (!token) {
      Alert.alert('Erro', 'Você precisa acessar primeiramente a tela de login', [
        { text: 'OK', onPress: () => console.log('Ok') },
      ]);
      navigation.navigate('Login');
    }
  }
  useEffect(() => {
    validateLogin()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../images/Tamagotchi.png')} style={styles.image} />
      <MyButton onPressButton={() => { navigation.navigate('ListaBichinho') }} containerStyle={styleButton} title={"Listagem de Bichinhos"} />
    </SafeAreaView>
  );
}
export default Home;