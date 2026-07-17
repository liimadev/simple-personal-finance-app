import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { cores, fontes, tamanhos } from '../../tema'
import { mainStyles } from "../../styles/main";
import BotaoFuncoes from "../../componentes/BotaoFuncoes";
import Feather from '@expo/vector-icons/Feather';
import BlocoInfo from "../../componentes/ BlocoInfo";
import { Bar } from "react-native-progress";
import ModalFinancas from "../../componentes/ModalFinancas";
import { useRef, useState } from "react";

export default function PaginaFinancas ({ navigation }) {
    const [modalFinancasAtivo, setModalFinancasAtivo] = useState(false)

    return (
        <ScrollView style={[mainStyles.container, style.container]}>

            <ModalFinancas ativo={modalFinancasAtivo} fechar={() => setModalFinancasAtivo(false)}/>

            <Text style={style.titulo}>Suas Finanças</Text>
            <Text style={style.descricao}>Aqui, você gerencia suas finanças e categorias.</Text>

            <View style={style.container_botoes}>
                <BotaoFuncoes
                    texto={"Criar finança"}
                    renderizarIcone={(cor) => <Feather name="plus-circle" size={tamanhos.md} color={cor} />}
                    outline={false}
                    corPrincipal={cores.primaria}
                    corSegundaria={cores.branco}
                    onPress={() => setModalFinancasAtivo(true)}
                />

                <BotaoFuncoes
                    texto={"Criar categoria"}
                    renderizarIcone={(cor) => <Feather name="plus-circle" size={tamanhos.md} color={cor} />}
                    outline={true}
                    corPrincipal={cores.primaria}
                    corSegundaria={cores.branco}
                />
            </View>

            <BlocoInfo titulo={"Visão Geral"} footer={"Suas finanças estão ótimas!"} mTop={20}>
                <Text style={style.texto_visao}>R$ 2.000/R$ 10.000,00</Text>

                <View style={style.container_progresso}>
                    <View style={{ flex: 1 }}>
                        <Bar
                            progress={0.2}
                            color={cores.primaria}
                            unfilledColor={cores.cinza_200}
                            height={10}
                            width={null}
                            borderWidth={0}
                        />
                    </View>
                    <Text>20%</Text>
                </View>
            </BlocoInfo>

            <Text style={[style.titulo, { fontSize: tamanhos.lg, marginBlock: 10}]}>Principais Gastos</Text>
            <BlocoInfo titulo={"Alimentação"} footer={"Seus gastos estão sob controle!"}>
                <Text style={style.texto_visao}>R$ 1.000,00/R$ 1.500,00</Text>

                <View style={style.container_progresso}>
                    <View style={{ flex: 1 }}>
                        <Bar
                            progress={0.66}
                            color={cores.primaria}
                            unfilledColor={cores.cinza_200}
                            height={10}
                            width={null}
                            borderWidth={0}
                        />
                    </View>
                    <Text>66%</Text>
                </View>
            </BlocoInfo>
            <BlocoInfo titulo={"Veículo"} footer={"Seus gastos passaram do planejado!"} mTop={10}>
                <Text style={style.texto_visao}>R$ 3.400,00/R$ 3.000,00</Text>

                <View style={style.container_progresso}>
                    <View style={{ flex: 1 }}>
                        <Bar
                            progress={1}
                            color={cores.primaria}
                            unfilledColor={cores.cinza_200}
                            height={10}
                            width={null}
                            borderWidth={0}
                        />
                    </View>
                    <Text>113%</Text>
                </View>
            </BlocoInfo>
            <View style={{ marginBottom: 80}}>
                <BlocoInfo titulo={"Moradia"} footer={"Seus gastos estão em alerta!"} mTop={10}>
                    <Text style={style.texto_visao}>R$ 2.500,00/R$ 3.000,00</Text>

                    <View style={style.container_progresso}>
                        <View style={{ flex: 1 }}>
                            <Bar
                                progress={0.83}
                                color={cores.primaria}
                                unfilledColor={cores.cinza_200}
                                height={10}
                                width={null}
                                borderWidth={0}
                            />
                        </View>
                        <Text>83%</Text>
                    </View>
                </BlocoInfo>
            </View>
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
    container_botoes: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        gap: 10, 
        marginTop: 10
    },
    container_progresso: { 
        width: "100%", 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10
    },

    texto_visao: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.lg,
        lineHeight: tamanhos.lg,
        marginTop: 5,
        color: cores.primaria
    }
})