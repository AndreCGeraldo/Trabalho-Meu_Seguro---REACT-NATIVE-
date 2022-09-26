import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState, useRef } from 'react';
import Constants from 'expo-constants';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Formulario({ navigation }) {
    const [cliente, setCliente] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [renovacao, setRenovacao] = useState(false);
    const Logo = require('../assets/logo.jpg');

    const dropdownRef = useRef({});

    const marcas = ['Audi',
        'BMW',
        'Chevrolet',
        'Citroen',
        'Fiat',
        'Ford',
        'Honda',
        'Hyundai',
        'Mitsubishi',
        'Nissan',
        'Peugeot',
        'Renault',
        'Toyota',
        'Volkswagen',
        'Volvo'
    ];

    const calcular = async () => {

        let porcentagem = 4.1

        if (renovacao === true) {
            porcentagem = 3.8
        }

        if (!preco || !cliente || !modelo) {
            return alert("ERRO... Preencha Todos os Campos!")
        }
        const resultado = (preco * porcentagem) / 100;
        setMensagem(resultado.toFixed(2))
    };

    const novo = async () => {
        setCliente('');
        setModelo('');
        setMarca('');
        setPreco('');
        setRenovacao(false);
        setMensagem(null);
        dropdownRef.current.reset();
    };


    const salvar = async (avaliacao) => {
        try {
            const jsonValue = JSON.stringify(avaliacao);
            await AsyncStorage.setItem('@Dados do Cadastro', jsonValue);
        } catch (e) {
            // error writing value
        }
    };


    const adicionarAvaliacao = async () => {
        const novo = {
            nome: cliente,
            modelo: modelo,
            preco: preco,
            marca: marca,
            renovacao: renovacao,
            mensagem: mensagem
        };
        // faz uma nova atribuição à lista, com os elementos
        // já existentes (...lista) e o novo
        salvar([novo]);
        // console.log(lista)
        setCliente('');
        setModelo('');
        setMarca('');
        setPreco('');
        setRenovacao(false);
        setMensagem(null);
        dropdownRef.current.reset();
    };



    return (
        <View style={styles.container} onPress={novo}>
            <Image source={Logo} style={styles.logoStyles} />
            <TextInput
                placeholder="Cliente / Contato"
                placeholderTextColor="#aaa"
                style={styles.textInput}
                onChangeText={(texto) => setCliente(texto)}
                value={cliente}
            />

            <TextInput
                placeholder="Modelo do Veículo"
                placeholderTextColor="#aaa"
                style={styles.textInput}
                onChangeText={(texto) => setModelo(texto)}
                value={modelo}
            />

            <View style={styles.selecao}>
                <SelectDropdown
                    ref={dropdownRef}
                    buttonStyle={styles.caixaTexto}
                    data={marcas}
                    value={marca}
                    defaultButtonText={"Selecionar Marca"}
                    onChangeText={setMarca}
                    placeholder="Marca"
                    onSelect={(selectedItem, index) => {
                        setMarca(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />

                <BouncyCheckbox
                    size={25}
                    isChecked={renovacao}
                    disableBuiltInState
                    fillColor="#cc0a00"
                    unfillColor="#FFFFFF"
                    textStyle={{ textDecorationLine: "none" }}
                    text="É Renovação"
                    iconStyle={{ borderColor: "#cc0a00" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={() => setRenovacao(!renovacao)}
                />
            </View>

            <TextInput
                placeholder="R$ Avaliação Tabela Fipe"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                placeholderTextColor="#aaa"
                style={styles.textInput}
                onChangeText={(texto) => setPreco(texto)}
                value={preco}
                keyboardType='number-pad'
                returnKeyType="done"
            />
            <View style={styles.botoes}>
                <TouchableOpacity
                    style={styles.botao} onPress={calcular}>
                    <Text style={styles.textoBotao}>CALCULAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botao} onPress={novo}>
                    <Text style={styles.textoBotao}>NOVO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botao} onPress={() => navigation.navigate('Listar')}>
                    <Text style={styles.textoBotao}>LISTAR</Text>
                </TouchableOpacity>
            </View>
            {mensagem && (
                <>
                    <Text style={styles.mensagem}>Valor Estimado do Seguro: R$ {mensagem}</Text>

                    <TouchableOpacity
                        style={styles.botaoReg} onPress={adicionarAvaliacao}>
                        <Text style={styles.textoBotao}>REGISTRAR INTERESSE</Text>
                    </TouchableOpacity>
                </>
            )}


        </View >

    );
}


const styles = StyleSheet.create({
    logoStyles: {
        paddingTop: Constants.statusBarHeight,
        width: 420,
        height: 150,
        marginTop: 10,
        alignSelf: "center",
        resizeMode: "stretch",
    },
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
        backgroundColor: '#ecf0f1',
        justifyContent: "space-between",
        height: 180,
        width: "90%",
        margin: 18,
    },
    textInput: {
        fontSize: 20,
        marginTop: 12,
        borderBottomColor: "#8B0000",
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    selecao: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
    botao: {
        backgroundColor: '#cc0a00',
        padding: 10,
        alignSelf: 'center',
        marginTop: 12,
        borderRadius: 6,
        width: 100,
    },
    botoes: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    textoBotao: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 14,
        textAlign: 'center'
    },
    mensagem: {
        fontStyle: 'italic',
        fontSize: 17,
        marginTop: 12,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    botaoReg: {
        backgroundColor: '#cc0a00',
        padding: 10,
        marginTop: 20,
        borderRadius: 6,
    },
    caixaTexto: {
        fontSize: 15,
        backgroundColor: '#DDD',
        borderWidth: 1,
        borderColor: '#cc0a00',
        borderRadius: 6,
        textAlign: 'center',
    }
})

