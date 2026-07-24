import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Alert } from "react-native";
import MainModal from "./MainModal";
import { mainStyles } from "../styles/main";
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import { cores, tamanhos } from "../tema";
import BotaoFuncoes from "./BotaoFuncoes";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dropdown } from "react-native-element-dropdown";
import { database } from "../database";
import { Q } from "@nozbe/watermelondb";

const tipoCategoria = [
    { label: 'Receitas', value: '1' },
    { label: 'Despesas', value: '2' }
]

export default function ModalCategorias ({ ativo, fechar }) {
    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState(null)
    const [valorExibido, setValorExibido] = useState('');
    
    const [cor, setCor] = useState('#70c1b3');

    const salvarValor = (texto) => {
        const apenasNumeros = texto.replace(/\D/g, '');
        const valorNumerico = Number(apenasNumeros) / 100;
        setValor(valorNumerico);

        const formatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorNumerico);

        setValorExibido(formatado);
    };

    const onSelectColor = ({ hex }) => {
        setCor(hex);
    };

    //------------------| SALVAR CATEGORIA |------------------//
    const salvarCategoria = async () => {
        if((titulo.trim().length == 0) || tipo < 1 || valor < 0.1)
            return Alert.alert('Erro', 'Preencha os campos corretamente.')

        try {
            const cor_ = cor.replace('#', '')
            const tituloNormalizado = titulo.trim().toLowerCase()

            const categoriaExiste = (await database.get('Categoria').query(Q.where("titulo", tituloNormalizado)).fetch()).length > 0
            if(categoriaExiste)
                return Alert.alert('Categoria já registrada', 'A categoria que você tentou salvar já existe.')

            await database.write(async () => {
                await database.get('Categoria').create(categoria => {
                    categoria.titulo = tituloNormalizado,
                    categoria.tipo = tipo,
                    categoria.metaMensal = valor
                    categoria.corDestaque = cor_
                })
            })

            Alert.alert(
                'Categoria registrada',
                'A categoria foi salva com sucesso!'
            )

            fechar()
            setTitulo('')
            setValor(0)
            setValorExibido('')
            setTipo(null)
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.')
            console.log(error)
        }
    }

    return (
        <MainModal
            ativo={ativo}
            fechar={fechar}
            titulo="Nova Categoria"
            porcentagem={0.8}
        >
            <View>
                <View style={mainStyles.container_input}>
                    <Text style={mainStyles.label}>Título da Categoria</Text>
                    <TextInput
                        style={mainStyles.input}
                        placeholderTextColor={cores.cinza_texto}
                        value={titulo}
                        onChangeText={text => setTitulo(text)}
                        placeholder="Digite algo"
                        autoCorrect={true}
                    />
                </View>
            </View>

            <View style={mainStyles.container_input}>
                <Text style={mainStyles.label}>Tipo de Finança</Text>
                <Dropdown
                    style={[mainStyles.input]}
                    placeholderStyle={mainStyles.input_placeholder}
                    selectedTextStyle={[mainStyles.input_placeholder, mainStyles.item_dropdown]}
                    itemTextStyle={[mainStyles.input_placeholder, mainStyles.item_dropdown]}
                    data={tipoCategoria}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione um tipo para a categoria"
                    value={tipo}
                    onChange={item => setTipo(item.value)}
                />
            </View>

            <View style={mainStyles.container_input}>
                <Text style={mainStyles.label}>Meta de gasto mensal (R$)</Text>
                <TextInput 
                    style={mainStyles.input}
                    placeholderTextColor={cores.cinza_texto}
                    keyboardType="numeric"
                    value={valorExibido}
                    onChangeText={salvarValor}
                    placeholder="R$ 0,00"
                    autoCorrect={true}
                />
            </View>

            <View style={mainStyles.container_input}>
                <View style={styles.labelColorContainer}>
                    <Text style={mainStyles.label}>Cor da Categoria</Text>
                    <View style={[styles.colorBadge, { backgroundColor: cor }]}>
                        <Text style={styles.colorBadgeText}>{cor.toUpperCase()}</Text>
                    </View>
                </View>
                
                <ColorPicker 
                    value={cor} 
                    onChangeJS={onSelectColor}
                    style={styles.pickerContainer}
                >
                    <Panel1 style={styles.panel} />
                    <HueSlider style={styles.slider} />
                </ColorPicker>
            </View>

            <View style={mainStyles.container_input}>
                <BotaoFuncoes
                    texto={"Salvar"} 
                    corPrincipal={cores.primaria} 
                    corSegundaria={cores.branco}
                    renderizarIcone={(cor) => <FontAwesome name="check-circle-o" size={tamanhos.lg} color={cor} />}
                    onPress={salvarCategoria}
                />
            </View>
        </MainModal>
    );
}

const styles = StyleSheet.create({
    labelColorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    colorBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    colorBadgeText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    pickerContainer: {
        width: '100%',
        gap: 12,
    },
    panel: {
        height: 120, 
        borderRadius: 10,
    },
    slider: {
        height: 25,
        borderRadius: 10,
    }
});