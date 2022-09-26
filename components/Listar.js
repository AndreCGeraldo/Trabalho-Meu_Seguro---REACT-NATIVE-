import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Listar = ({ navigation }) => {
    const Logo = require('../assets/logo.jpg');

    const [item, setItem] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@Dados do Cadastro');
            const avaliacao = jsonValue != null ? JSON.parse(jsonValue) : [];
            setItem(avaliacao);
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <SafeAreaView>
            <Image source={Logo} style={styles.logoStyles} />
            <Text style={styles.titulo}>Listagem das Avaliações</Text>

            <View style={styles.texto}>
                <Text style={styles.valores}>Nome do Cliente:
                    <Text style={styles.valores2}> {item[0]?.nome}</Text>
                </Text>
                <Text style={styles.valores}>Modelo do Veículo:
                    <Text style={styles.valores2}> {item[0]?.modelo}</Text>
                </Text>
                <Text style={styles.valores}>Marca:
                    <Text style={styles.valores2}> {item[0]?.marca}</Text>
                </Text>
                <Text style={styles.valores}>Renovação:
                    <Text style={styles.valores2}> {item[0]?.renovacao ? "Sim " : "Não"}</Text>
                </Text>
                <Text style={styles.valores}>Preço do Veículo: R$
                    <Text style={styles.valores2}> {Number(item[0]?.preco).toFixed(2)}</Text>
                </Text>
                <Text style={styles.valores}>Preço da Avaliação: R$
                    <Text style={styles.valores2}> {item[0]?.mensagem}</Text>
                </Text>
            </View>

            <TouchableOpacity
                style={styles.botao} onPress={() => navigation.goBack()}>
                <Text
                    style={styles.textoBotao}>Voltar
                </Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    logoStyles: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
        width: 420,
        height: 150,
        marginTop: 10,
        alignSelf: 'center',
        resizeMode: 'stretch',
    },
    lista: {
        fontSize: 14,
        lineHeight: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#cc0a00',
        borderRadius: 4,
        padding: 4,
        marginTop: 2,
    },
    titulo: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    botao: {
        backgroundColor: '#cc0a00',
        padding: 10,
        marginTop: 20,
        borderRadius: 6,
    },
    textoBotao: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    },
    valores: {
        display: 'flex',
        padding: 10,
        fontSize: 20,
        fontStyle: 'italic',
    },
    valores2: {
        color: '#cc0a00',
        fontWeight: 'bold',

    },
})

export default Listar;