import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { cores, tamanhos } from "../tema";

export default function BotaoHome ({ focused }) {
    return (
        <View style={[styles.botao, focused && styles.botao_focado]}>
            <Entypo name="home" size={tamanhos.xl} color={ focused ? cores.branco : cores.cinza} />
        </View>
    )
}

const styles = StyleSheet.create({
    botao: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: cores.branco,
        alignItems: 'center',
        justifyContent: 'center',
        top: -20,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4.65,

        elevation: 10,
    },
    botao_focado: {
        backgroundColor: cores.primaria
    }
})