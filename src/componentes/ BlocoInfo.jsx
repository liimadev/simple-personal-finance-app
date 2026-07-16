import { StyleSheet, View, Text } from "react-native";
import { cores, fontes, tamanhos } from "../tema";

export default function BlocoInfo ({ children, titulo, footer, mTop }) {
    return (
        <View style={[style.container, mTop && { marginTop: mTop }]}>
            {titulo && <Text style={style.titulo}>{titulo}</Text>}
            { children }
            {footer && <Text style={style.footer}>{footer}</Text>}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        borderWidth: 1.5,
        borderColor: cores.cinza,
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingBlock: 10,
        paddingInline: 15
    },
    titulo: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.lg * 0.75
    },
    footer: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.sm,
        color: cores.cinza_700,
        marginTop: 5
    }
})