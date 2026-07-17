import { Dimensions, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { cores } from "../tema"

export default function MainModal ({ ativo, fechar, children }) {
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
                            <View style={styles.content}>
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
    content: {
        backgroundColor: cores.branco,
        height: Dimensions.get('screen').height * 0.7,
        paddingInline: 20,
        paddingBlock: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    }
})