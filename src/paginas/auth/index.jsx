import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import { mainStyles } from '../../styles/main'
import { cores, fontes, tamanhos } from "../../tema";
import BotaoFuncoes from '../../componentes/BotaoFuncoes'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication'

export default function PaginaAuth ({ navigation }) {
    const [compativel, setCompativel] = useState(false)
    
    useEffect(() => {
        verificarSuporteBiometrico()
    }, [])

    const verificarSuporteBiometrico = async () => {
        const possuiHardware = await LocalAuthentication.hasHardwareAsync()
        const possuiBiometriaCadastrada = await LocalAuthentication.isEnrolledAsync()

        setCompativel(possuiHardware && possuiBiometriaCadastrada)
    }

    const handleAutenticao = async () => {
        if(!compativel) {
            Alert.alert(
                "Não compatível",
                "Seu dispositivo não possui biometria cadastrada ou não suporta essa tecnologia."
            )
            return
        }

        const resultado = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Desbloqueie para usar o app.',
            fallbackLabel: 'Usar senha padrão',
            disableDeviceFallback: false
        })

        if(resultado.success) {
            navigation.replace('main')
        }
    }

    return (
        <View style={[mainStyles.container, styles.body]}>
            <View style={styles.container_logo}>
                <Image 
                    source={require('../../../assets/logo_primaria.png')}
                    style={{ width: 200, height: 200}}
                />
                <Text style={styles.sobrou}>Sobrou!</Text>
            </View>

            <Text style={styles.mensagem}>Clique no botão abaixo para acessar o app.</Text>
            <BotaoFuncoes 
                texto={"Entrar"} 
                corPrincipal={cores.primaria}
                corSegundaria={cores.branco}
                renderizarIcone={(cor) => <Ionicons name="enter" size={tamanhos.lg} color={cor} />}
                onPress={handleAutenticao}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    container_logo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sobrou: {
        fontFamily: fontes.bold,
        fontSize: tamanhos.xl,
        color: cores.primaria
    },
    mensagem: {
        fontFamily: fontes.medium,
        fontSize: tamanhos.md,
        color: cores.preto,
        paddingInline: 30,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15
    }
})