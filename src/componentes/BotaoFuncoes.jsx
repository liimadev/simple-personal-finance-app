import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { cores, fontes, tamanhos } from "../tema";

export default function BotaoFuncoes({ texto, renderizarIcone, outline, corPrincipal, corSegundaria, onPress }) {
    return (
        <TouchableOpacity
            style={[
                style.container,
                {
                    backgroundColor: !outline ? corPrincipal : corSegundaria
                },
                {
                    borderWidth: 1.5,
                    borderColor: corPrincipal
                }
            ]}
            activeOpacity={0.9}
            onPress={onPress}
        >

            {renderizarIcone && renderizarIcone(!outline ? corSegundaria : corPrincipal)}
            <Text
                style={[
                    style.texto,
                    { color: !outline ? corSegundaria : corPrincipal }
                ]}
            >
                {texto}
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        paddingInline: 12,
        paddingBlock: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    texto: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.md,
        lineHeight: tamanhos.md + 5
    }
})