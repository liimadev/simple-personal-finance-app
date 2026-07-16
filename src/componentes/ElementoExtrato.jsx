import { StyleSheet, Text, View } from "react-native";
import { cores, fontes, tamanhos } from "../tema";

export default function ElementoExtrato ({ titulo, data, valor, isEntrada=true, exibir }) {
    return (
        <View style={style.container}>
            <View style={{ width: '70%'}}>
                <Text style={style.titulo} numberOfLines={1} ellipsizeMode="tail">{titulo}</Text>
                <Text style={style.data}>{data}</Text>
            </View>
            <Text style={[style.valor, {color: isEntrada ? cores.verde_receita : cores.vermelho_despesa}]}>
                {isEntrada ? "+" : "-"} {!exibir ? valor : "*,**"}
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 10,
        paddingBlock: 10,
        borderTopWidth: 1,
        borderTopColor: cores.cinza
    },
    titulo: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.md * 1.3,
        lineHeight: (tamanhos.md * 1.3),
        width: '100%'
    },
    data: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.sm * 0.9,
        color: cores.cinza_700
    },
    valor: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.md,
        lineHeight: tamanhos.md
    }
})