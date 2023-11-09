
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "../../functions/saveToken";
import { Avatar } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centerImage: {
        justifyContent: "center",
        alignItems: "center",
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
const DetalhesBichinho = ({ route, navigation }: any) => {
    const { id } = route.params;
    const { token } = useAuthStore();
    const [tamagotchi, setTamagotchi] = useState<any>();
    const ListItem = () => {
        return (

            <SafeAreaView style={styles.container}>
                <Card mode="contained" style={styles.cardContainer}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            <View style={styles.centerImage}><Avatar.Image size={90} source={require('../imageScreen/bichinho.jpg')} /></View>
                            <Text style={styles.text}>Nome: {tamagotchi?.name}</Text>
                            <Text style={styles.text}>Vida: {tamagotchi?.life}</Text>
                            <Text style={styles.text}>Nivel de descanso: {tamagotchi?.restLevel}</Text>
                            <Text style={styles.text}>Diversão: {tamagotchi?.funLevel}</Text>

                            <Button mode="contained" textColor={'#008080'} onPress={() => navigation.navigate('CaraCoroa', { id })}>Brincar</Button>

                            <Button mode="contained" textColor={'#008080'} onPress={() => descansar()}>Dormir</Button>
                            <Button mode="contained-tonal" textColor={'#f00'} buttonColor={'#ff8484'} onPress={() => alimentar()}>Comer</Button>
                        </View>
                    </Card.Content>
                </Card>
            </SafeAreaView>
        )
    }
    const getDetalhesBichinho = async () => {
        console.log(id)
        try {
            const { data } = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id,
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
            setTamagotchi(data);
            console.log(tamagotchi)
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }

    }
    useEffect(() => {
        getDetalhesBichinho();
    }, [navigation])

    const alimentar = async () => {
        try {
            await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id + '/food', {}, {
                headers: {
                    'x-access-token': token,
                },
            });

            getDetalhesBichinho();
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }
    }

    const descansar = async () => {
        try {
            await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id + '/rest', {},
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
            getDetalhesBichinho();
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }
    }


    return (
        ListItem()

    );
}

export default DetalhesBichinho;