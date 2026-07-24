import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { mainStyles } from "../../styles/main";
import { cores, fontes, tamanhos } from "../../tema";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react";
import BotaoFuncoes from "../../componentes/BotaoFuncoes";
import BlocoInfo from "../../componentes/ BlocoInfo";
import { Bar } from "react-native-progress";
import ElementoExtrato from "../../componentes/ElementoExtrato";
import ModalFinancas from "../../componentes/ModalFinancas";
import { database } from "../../database";
import { useValoresOcultosStore } from "../../servicos/valoresOcultosStore";

export default function PaginaHome ({ navigation }) {
    const { valoresOcultos, toggleValoresOcultos } = useValoresOcultosStore()
    const [usuario, setUsuario] = useState(null)

    //------------------| USUARIO |------------------//
    const carregarUsuario = async () => {
        const _usuario = (await database.get('Usuario').query().fetch())[0]
        setUsuario(_usuario.nome.trim())
    }

    //------------------| MODAL |------------------//
    const [modalFinancasAtivo, setModalFinancasAtivo] = useState(false)
    const [financaIsReceita, setFinancaIsReceita] = useState(true)

    const abrirModalFinancas = (isReceita) => {
        setFinancaIsReceita(isReceita)
        setModalFinancasAtivo(true)
    }


    useEffect(() => {
        carregarUsuario()
    }, [])
    
    return (
        <ScrollView style={mainStyles.container}>
            <ModalFinancas
                ativo={modalFinancasAtivo} 
                fechar={() => setModalFinancasAtivo(false)}
                tipoFinancaInicial={financaIsReceita ? "1" : "2"}
            />

            <View style={styles.cabecalho}>
                <View style={[styles.saud_cabecalho, styles.padding_cabecalho]}>
                    <Text style={styles.saudacao_cabecalho}>Olá, {usuario}!</Text>
                    <TouchableOpacity
                        onPress={toggleValoresOcultos}
                        activeOpacity={1}
                    >
                        <Ionicons name={valoresOcultos ? 'eye' : 'eye-off' } size={tamanhos.lg} color={cores.branco} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.padding_cabecalho, { marginTop: 25, }]}>
                    <Text style={styles.texto_comum}>Saldo total disponível</Text>
                    <Text style={styles.saldo}>{ valoresOcultos ? "R$ -,--" : "R$ 10.000,00"}</Text>
                </View>

                <View>
                    <View style={[styles.padding_cabecalho, styles.container_progresso_saldo]}>
                        <View>
                            <Text style={styles.container_progresso_saldo.saldo}>R$ {valoresOcultos ? '-,--' : '2.000,00'}</Text>
                            <Text style={styles.container_progresso_saldo.descricao}>Usado</Text>
                        </View>
                        <View>
                            <Text style={styles.container_progresso_saldo.saldo}>R$ {valoresOcultos ? '-,--' : '12.000,00'}</Text>
                            <Text style={[styles.container_progresso_saldo.descricao, { textAlign: 'right' }]}>Total</Text>
                        </View>
                    </View>
                    <Bar
                        progress={valoresOcultos ? 0 : 0.2}
                        color={cores.secundaria}
                        unfilledColor={null}
                        height={10}
                        width={null}
                        borderWidth={0}
                    />
                </View>
            </View>

            <View style={{ paddingInline: 20, marginTop: 20 }}>
                <View style={[styles.saud_cabecalho, { width: '100%', gap: 10, marginTop: 10 }]}>
                    <BotaoFuncoes
                        texto={"Nova entrada"}
                        renderizarIcone={(cor) => <Feather name="plus-circle" size={tamanhos.md} color={cor} />}
                        outline={false}
                        corPrincipal={cores.primaria}
                        corSegundaria={cores.branco}
                        onPress={() => abrirModalFinancas(true)}
                    />

                    <BotaoFuncoes
                        texto={"Nova saída"}
                        renderizarIcone={(cor) => <Feather name="minus-circle" size={tamanhos.md} color={cor} />}
                        outline={true}
                        corPrincipal={cores.primaria}
                        corSegundaria={cores.branco}
                        onPress={() => abrirModalFinancas(false)}
                    />
                </View>

                {/* <BlocoInfo titulo={"Saúde Financeira"} footer={"Sua saúde financeira está ótima!"}>
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
                </BlocoInfo> */}

                {/* <BlocoInfo titulo={"Receitas em Julho"} mTop={12}>
                    <Text style={[styles.receita_despesa, { color: cores.verde_receita}]}>
                        + R$ {valoresOcultos ? "-,--" : "12.000,00"}
                    </Text>
                </BlocoInfo>

                <BlocoInfo titulo={"Despesas em Julho"} mTop={12}>
                    <Text style={[styles.receita_despesa, { color: cores.vermelho_despesa}]}>
                        - R$ {valoresOcultos ? "-,--" : "2.000,00"}
                    </Text>
                </BlocoInfo> */}

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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden'
    },
    padding_cabecalho: {
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
    },

    container_progresso_saldo: { 
        marginTop: 15, 
        marginBottom: 5, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',

        saldo: { 
            fontFamily: fontes.bold, 
            color: cores.branco, 
            fontSize: tamanhos.sm, 
            lineHeight: tamanhos.sm
        },

        descricao: { 
            fontFamily: fontes.regular, 
            color: cores.cinza_200, 
            fontStyle: 'italic', 
            fontSize: tamanhos.xs * 1.4, 
            lineHeight: (tamanhos.xs * 1.4)
        }
    }
})