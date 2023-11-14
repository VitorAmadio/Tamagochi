import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import useAuthStore from '../functions/saveToken';
import axios from 'axios';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
    },
    botao: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
    },
    resultadoContainer: {
        marginTop: 20,
    },
    resultadoTexto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const CaraCoroa = ({ route }: any) => {
    const { id } = route.params;
    const { token } = useAuthStore();
    const [resultado, setResultado] = useState<string | null>();
    const [escolha, setEscolha] = useState<string | null>();

    const aumentarVida = async () => {
        try {
            await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id + '/play', {},
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
        } catch (error) {
            Alert.alert('Erro', `${error}`, [
                { text: 'Ok', onPress: () => console.log('Ok') },
            ]);
        }
    }

    const jogarMoeda = () => {
        const numeroAleatorio = Math.floor(Math.random() * 2);
        const novoResultado = numeroAleatorio === 0 ? 'Cara' : 'Coroa';
        setResultado(novoResultado);


        if (escolha === novoResultado) {
            Alert.alert('Parabéns', 'Parabéns, você ganhou!', [
                { text: 'OK', onPress: () => console.log('Ok') },
            ]);
        } else {
            Alert.alert('Derrota', 'Que pena, você perdeu!', [
                { text: 'OK', onPress: () => console.log('Ok') },
            ]);
        }
        aumentarVida();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cara ou Coroa</Text>

            <TouchableOpacity onPress={() => setEscolha('Cara')} style={styles.botao}>
                <Text style={styles.textoBotao}>Escolher Cara</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setEscolha('Coroa')} style={styles.botao}>
                <Text style={styles.textoBotao}>Escolher Coroa</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={jogarMoeda} style={styles.botao}>
                <Text style={styles.textoBotao}>Jogar Moeda</Text>
            </TouchableOpacity>

            {resultado && (
                <View style={styles.resultadoContainer}>
                    <Text style={styles.resultadoTexto}>Resultado: {resultado}</Text>
                </View>
            )}
            <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoTexto}>Escolhido: {escolha}</Text>
            </View>
        </View>
    );
};



export default CaraCoroa;
