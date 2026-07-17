import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { cores, fontes, tamanhos } from "../tema"
import Ionicons from '@expo/vector-icons/Ionicons';
import MainModal from "./MainModal";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

const tipoFinanca = [
    { label: 'Receita', value: '1' },
    { label: 'Despesa', value: '2' }
]

const categorias = [
    { label: '-', value: '1' }
]

export default function ModalFinancas ({ ativo, fechar }) {
    const [tipo, setTipo] = useState(null)
    const [titulo, setTitulo] = useState('')

    const [valor, setValor] = useState(0)
    const [valorExibido, setValorExibido] = useState('')

    const [DataExibida, setDataExibida] = useState('')

    const salvarValor = (texto) => {
        const apenasNumeros = texto.replace(/\D/g, '')
        const valorNumerico = Number(apenasNumeros) / 100
        setValor(valorNumerico)

        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorNumerico)

        setValorExibido(formatado)
    }

    const salvarData = (texto) => {
        const apenasNumeros = texto.replace(/\D/g, '');
        const numerosLimitados = apenasNumeros.slice(0, 8);

        let dataFormatada = numerosLimitados;
        
        if (numerosLimitados.length > 2 && numerosLimitados.length <= 4) {
            dataFormatada = numerosLimitados.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
        } else if (numerosLimitados.length > 4) {
            dataFormatada = numerosLimitados.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
        }

        setDataExibida(dataFormatada);
    }

    const [campoFocado, setCampoFocado] = useState(false)

    return (
        <MainModal
            ativo={ativo}
            fechar={fechar}
        >
            <View style={styles.cabecalho}>
                <Text style={styles.cabecalho_titulo}>Nova Finança</Text>
                <TouchableOpacity onPress={fechar} activeOpacity={0.9}>
                    <Ionicons name="close" size={tamanhos.lg * 1.2} color={cores.preto} />
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.container_input}>
                    <Text style={styles.label}>Tipo de Finança</Text>
                    <Dropdown 
                        style={[styles.input, campoFocado && styles.input_focado]}
                        placeholderStyle={styles.input_placeholder}
                        selectedTextStyle={styles.input_placeholder}
                        itemTextStyle={styles.input_placeholder}
                        data={tipoFinanca}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione um tipo de finança"
                        value={tipo}
                        onChange={item => setTipo(item.value)}
                    />
                </View>

                <View style={styles.container_input}>
                    <Text style={styles.label}>Titulo</Text>
                    <TextInput 
                        style={styles.input}
                        value={titulo}
                        onChangeText={text => setTitulo(text)}
                        placeholder="Digite algo"
                        autoCorrect={true}
                    />
                </View>

                <View style={styles.container_input}>
                    <Text style={styles.label}>Valor (R$)</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType="numeric"
                        value={valorExibido}
                        onChangeText={salvarValor}
                        placeholder="0,00"
                        autoCorrect={true}
                    />
                </View>

                <View style={styles.container_input}>
                    <Text style={styles.label}>Categoria</Text>
                    <Dropdown 
                        style={styles.input}
                        placeholderStyle={styles.input_placeholder}
                        selectedTextStyle={styles.input_placeholder}
                        itemTextStyle={styles.input_placeholder}
                        data={categorias}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione uma categoria"
                        value={null}
                        onChange={() => {}}
                    />
                </View>

                <View style={styles.container_input}>
                    <Text style={styles.label}>Data de lançamento</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType="numeric"
                        value={DataExibida}
                        onChangeText={salvarData}
                        placeholder="DD/MM/AAAA"
                        autoCorrect={true}
                        focusable={true}
                    />
                </View>


            </View>
        </MainModal>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cabecalho_titulo: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.md * 1.3,
        lineHeight: (tamanhos.md * 1.3) + 10,
        color: cores.preto
    },
    container_input: {
        marginTop: 15
    },
    input: {
        backgroundColor: cores.branco,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: cores.cinza,
        borderRadius: 5,
        fontFamily: fontes.medium,
        fontSize: tamanhos.sm,
        lineHeight: tamanhos.sm + 10
    },
    input_focado: {
        borderColor: cores.primaria
    },
    input_placeholder: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.md,
        lineHeight: tamanhos.md * 1.5
    },
    label: {
        fontFamily: fontes.semibold,
        fontSize: tamanhos.md,
        lineHeight: tamanhos.md * 1.5,
        marginBottom: 5
    }
})