import { View, Text, ScrollView, StyleSheet } from "react-native";
import { mainStyles } from "../../styles/main";
import { cores, fontes, tamanhos } from "../../tema";
import { Circle } from "react-native-progress";
import Alerta from "../../componentes/Alerta";

export default function PaginaHome ({ navigation }) {
    return (
        <ScrollView style={[mainStyles.container, style.container]}>
            <Text style={style.titulo}>Saúde Financeira</Text>
            <Text style={style.descricao}>Aqui, você acompanha sua saúde financeira e dicas para melhorá-la.</Text>

            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
                <Circle 
                    progress={0.82}
                    size={180}
                    color={cores.primaria}
                    unfilledColor={cores.cinza_200}
                    thickness={24}
                    borderWidth={0}
                    showsText={true}
                    formatText={() => { 
                        return (
                            <Text style={style.porcentagem}>82%</Text>
                        )
                    }}
                />
                <Text style={style.mensagem}>Você está saudável financeiramente!</Text>
            </View>

            <Text style={[style.titulo, { fontSize: tamanhos.lg, marginTop: 10}]}>Alertas e Dicas</Text>
            <Alerta titulo={"Alerta: Você gastou 90% do seu orçamento para Alimentação."} descricao={"Tenha mais cuidado para não afetar sua saúde financeira."} />
            <Alerta 
                titulo={"Dica: Sobrou R$ 250 no seu saldo mensal. Que tão investir este valor?"} 
                descricao={"Um pequeno valor bem investido pode se transformar em um grande motante."} 
                isAlerta={false}
            />
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        paddingInline: 20,
        paddingBlock: 35
    },
    titulo: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.lg * 1.2,
        lineHeight: (tamanhos.lg * 1.2) + 10,
        color: cores.preto
    },
    descricao: {
        fontFamily: fontes.medium,
        fontSize: (tamanhos.md * 0.9),
        lineHeight: (tamanhos.md * 0.9) + 5,
        color: cores.cinza_texto
    },

    porcentagem: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.xl * 1.3,
        lineHeight: tamanhos.xl * 1.3
    },
    mensagem: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.lg * 0.8,
        lineHeight: tamanhos.lg * 0.8,
        color: cores.cinza_texto,
        textAlign: 'center',
        marginTop: 10
    }
})