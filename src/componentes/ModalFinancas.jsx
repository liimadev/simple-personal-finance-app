import { Text, TextInput, View } from "react-native"
import MainModal from "./MainModal";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { mainStyles } from "../styles/main";
import { cores, tamanhos } from "../tema";
import BotaoFuncoes from './BotaoFuncoes'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const tipoFinanca = [
    { label: 'Receita', value: '1' },
    { label: 'Despesa', value: '2' }
]

const categorias = [
    { label: '-', value: '1' }
]

export default function ModalFinancas ({ ativo, fechar, tipoFinancaInicial='1' }) {
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

    useEffect(() => {
        if (ativo) {
            setTipo(String(tipoFinancaInicial));
        }
    }, [ativo, tipoFinancaInicial]);

    return (
        <MainModal
            ativo={ativo}
            fechar={fechar}
            titulo="Nova Finança"
        >

            <View>
                <View style={mainStyles.container_input}>
                    <Text style={mainStyles.label}>Tipo de Finança</Text>
                    <Dropdown 
                        style={[mainStyles.input]}
                        placeholderStyle={mainStyles.input_placeholder}
                        selectedTextStyle={[mainStyles.input_placeholder, mainStyles.item_dropdown]}
                        itemTextStyle={[mainStyles.input_placeholder, mainStyles.item_dropdown]}
                        data={tipoFinanca}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione um tipo de finança"
                        value={tipo}
                        onChange={item => setTipo(item.value)}
                    />
                </View>

                <View style={mainStyles.container_input}>
                    <Text style={mainStyles.label}>Titulo</Text>
                    <TextInput 
                        style={mainStyles.input}
                        placeholderTextColor={cores.cinza_texto}
                        value={titulo}
                        onChangeText={text => setTitulo(text)}
                        placeholder="Digite algo"
                        autoCorrect={true}
                    />
                </View>

                <View style={mainStyles.container_input}>
                    <Text style={mainStyles.label}>Valor (R$)</Text>
                    <TextInput 
                        style={mainStyles.input}
                        placeholderTextColor={cores.cinza_texto}
                        keyboardType="numeric"
                        value={valorExibido}
                        onChangeText={salvarValor}
                        placeholder="0,00"
                        autoCorrect={true}
                    />
                </View>

                <View style={mainStyles.container_input}>
                    <Text style={mainStyles.label}>Categoria</Text>
                    <Dropdown 
                        style={mainStyles.input}
                        placeholderStyle={mainStyles.input_placeholder}
                        selectedTextStyle={[mainStyles.input_placeholder, mainStyles.item_dropdown]}
                        itemTextStyle={[mainStyles.input_placeholder, mainStyles.item_dropdown]}
                        data={categorias}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione uma categoria"
                        value={null}
                        onChange={() => {}}
                    />
                </View>

                <View style={mainStyles.container_input}>
                    <Text style={mainStyles.label}>Data de lançamento</Text>
                    <TextInput 
                        style={mainStyles.input}
                        placeholderTextColor={cores.cinza_texto}
                        keyboardType="numeric"
                        value={DataExibida}
                        onChangeText={salvarData}
                        placeholder="DD/MM/AAAA"
                        autoCorrect={true}
                        focusable={true}
                    />
                </View>

                <View style={mainStyles.container_input}>
                    <BotaoFuncoes 
                        texto={"Salvar"} 
                        corPrincipal={cores.primaria} 
                        corSegundaria={cores.branco}
                        renderizarIcone={(cor) => <FontAwesome name="check-circle-o" size={tamanhos.lg} color={cor} />}
                    />
                </View>
            </View>
        </MainModal>
    )
}