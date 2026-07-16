import { StyleSheet, Text } from "react-native";
import BlocoInfo from "./ BlocoInfo";
import { cores, fontes, tamanhos } from "../tema";

export default function Alerta ({ titulo, descricao, isAlerta=true }) {
    const localCores = {
        vermelho_fundo: "#FFF5F5",
        vermelho_borda: "#D90000",
        vermelho_desc: "#760000",

        azul_fundo: "#E7EFFF",
        azul_borda: cores.primaria,
        azul_desc: cores.secundaria
    }

    const cor = () => {
        return isAlerta ? "vermelho" : "azul"
    }

    return (
        <BlocoInfo style={{ backgroundColor: localCores[`${cor()}_fundo`], borderColor: localCores[`${cor()}_borda`], marginTop: 15}}>
            <Text style={[style.titulo, { color: localCores[`${cor()}_borda`] }]}>{titulo}</Text>
            <Text style={[style.descricao, { color: localCores[`${cor()}_desc`]}]}>{descricao}</Text>
        </BlocoInfo>
    )
}

const style = StyleSheet.create({
    titulo: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.md,
        lineHeight: tamanhos.md * 1.2
    },
    descricao: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.sm,
        lineHeight: tamanhos.sm * 1.2,
        marginTop: 5
    }
})