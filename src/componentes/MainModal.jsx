import { Dimensions, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { cores, fontes, tamanhos } from "../tema"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MainModal ({ ativo, fechar, titulo, children, porcentagem=0.8 }) {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Modal
                        visible={ativo}
                        onRequestClose={() => fechar}
                        animationType="slide"
                        transparent={true}
                        statusBarTranslucent={true}
                    >
                        <View style={styles.container}>
                            <View style={styles.content(porcentagem)}>
                                <View style={styles.cabecalho}>
                                    <Text style={styles.cabecalho_titulo}>{titulo}</Text>
                                    <TouchableOpacity onPress={fechar} activeOpacity={0.9}>
                                        <Ionicons name="close" size={tamanhos.lg * 1.2} color={cores.preto} />
                                    </TouchableOpacity>
                                </View>
                                { children }
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'flex-end'
    },
    cabecalho: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cabecalho_titulo: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.md * 1.3,
        lineHeight: (tamanhos.md * 1.3) + 10,
        color: cores.preto
    },
    content: (porcentagem) => ({
        backgroundColor: cores.branco,
        height: Dimensions.get('screen').height * porcentagem,
        paddingInline: 20,
        paddingBlock: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    })
})