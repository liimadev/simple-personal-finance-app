import { StyleSheet, View, Text } from "react-native";
import { cores, fontes, tamanhos } from "../tema";

export default function BlocoInfo ({ children, titulo, footer, mTop, style }) {
    return (
        <View style={[styles.container, mTop && { marginTop: mTop }, style]}>
            {titulo && <Text style={styles.titulo}>{titulo}</Text>}
            { children }
            {footer && <Text style={styles.footer}>{footer}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
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
        fontSize: tamanhos.lg * 0.75,
        color: cores.preto
    },
    footer: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.sm,
        color: cores.cinza_texto,
        marginTop: 5
    }
})