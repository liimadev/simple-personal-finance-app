import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { mainStyles } from "../../styles/main";
import { cores, fontes, tamanhos } from "../../tema";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import BotaoFuncoes from "../../componentes/BotaoFuncoes";
import BlocoInfo from "../../componentes/ BlocoInfo";
import { Bar } from "react-native-progress";
import ElementoExtrato from "../../componentes/ElementoExtrato";

export default function PaginaHome ({ navigation }) {
    const [valoresOcultos, setValoresOcultos] = useState(false)

    return (
        <ScrollView style={mainStyles.container}>
            <View style={styles.cabecalho}>
                <View style={styles.saud_cabecalho}>
                    <Text style={styles.saudacao_cabecalho}>Olá, Usuário!</Text>
                    <TouchableOpacity
                        onPress={() => setValoresOcultos(valorAnterior => !valorAnterior)}
                        activeOpacity={1}
                    >
                        <Ionicons name={valoresOcultos ? 'eye' : 'eye-off' } size={tamanhos.lg} color={cores.branco} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 25, }}>
                    <Text style={styles.texto_comum}>Saldo total disponível</Text>
                    <Text style={styles.saldo}>{ valoresOcultos ? "R$ *,**" : "R$ 10.000,00"}</Text>
                </View>

                <View style={[styles.saud_cabecalho, { justifyContent: 'flex-start', gap: 10, marginTop: 10 }]}>
                    <BotaoFuncoes
                        texto={"Nova entrada"}
                        renderizarIcone={(cor) => <Feather name="plus-circle" size={tamanhos.md} color={cor} />}
                        outline={false}
                        corPrincipal={cores.branco}
                        corSegundaria={cores.primaria}
                    />

                    <BotaoFuncoes
                        texto={"Nova saída"}
                        renderizarIcone={(cor) => <Feather name="minus-circle" size={tamanhos.md} color={cor} />}
                        outline={true}
                        corPrincipal={cores.branco}
                        corSegundaria={cores.primaria}
                    />
                </View>
            </View>

            <View style={{ paddingInline: 20, marginTop: 20 }}>
                <BlocoInfo titulo={"Saúde Financeira"} footer={"Sua saúde financeira está ótima!"}>
                    <View style={styles.container_saude}>
                        <View style={{ flex: 1 }}>
                            <Bar
                                progress={0.82}
                                color={cores.primaria}
                                unfilledColor={cores.cinza_200}
                                height={10}
                                width={null}
                                borderWidth={0}
                            />
                        </View>
                        <Text>82%</Text>
                    </View>
                </BlocoInfo>

                <BlocoInfo titulo={"Receitas em Julho"} mTop={12}>
                    <Text style={[styles.receita_despesa, { color: cores.verde_receita}]}>
                        + R$ {valoresOcultos ? "*,**" : "12.000,00"}
                    </Text>
                </BlocoInfo>

                <BlocoInfo titulo={"Despesas em Julho"} mTop={12}>
                    <Text style={[styles.receita_despesa, { color: cores.vermelho_despesa}]}>
                        - R$ {valoresOcultos ? "*,**" : "2.000,00"}
                    </Text>
                </BlocoInfo>

                <BlocoInfo mTop={12}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{ fontFamily: fontes.bold, fontSize: tamanhos.lg * 0.75}}>Extrato Recente</Text>
                        <TouchableOpacity activeOpacity={0.9}>
                            <Text style={styles.extrato_link}>Ver mais</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <ElementoExtrato titulo={"Compra na loja X"} data={"16/07/2026, 14h48"} isEntrada={false} valor={"19,90"} exibir={valoresOcultos} />
                    <ElementoExtrato titulo={"Salário"} data={"13/07/2026, 17h38"} valor={"4.923,09"} exibir={valoresOcultos} />
                </BlocoInfo>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        backgroundColor: cores.primaria,
        height: 240,
        borderBottomRightRadius: 35,
        paddingInline: 20
    },
    saud_cabecalho: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 35
    },
    saudacao_cabecalho: {
        color: cores.branco,
        fontFamily: fontes.bold,
        fontSize: tamanhos.lg * 0.75,
        margin: 0
    },
    texto_comum: {
        fontFamily: fontes.regular,
        fontSize: tamanhos.md,
        lineHeight: tamanhos.md + 5,
        color: cores.branco
    },
    saldo: {
        fontSize: tamanhos.xl * 1.2,
        fontFamily: fontes.medium,
        lineHeight: tamanhos.xl + 10,
        color: cores.branco
    },

    container_saude: { 
        width: "100%", 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10
    },
    receita_despesa: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.xl * 0.8,
        lineHeight: (tamanhos.xl * 0.8) + 5,
    },

    extrato_link: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.sm,
        color: cores.primaria
    }
})