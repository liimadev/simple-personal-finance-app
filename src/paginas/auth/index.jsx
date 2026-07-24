import { View, Text, StyleSheet, Image, Alert, TextInput, Dimensions, Switch } from "react-native";
import { mainStyles } from '../../styles/main'
import { cores, fontes, tamanhos } from "../../tema";
import BotaoFuncoes from '../../componentes/BotaoFuncoes'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication'
import { database } from '../../database'

export default function PaginaAuth ({ navigation }) {
    const [compativel, setCompativel] = useState(false)
    const [isLogado, setIsLogado] = useState(false)
    
    //------------------| USUARIO |------------------//
    const [nome, setNome] = useState('')
    const [ativarBiometria, setAtivarBiometria] = useState(false)

    const verificarUsuarioExiste = async () => {
        const count = await database.get('Usuario').query().fetchCount()
        
        setIsLogado(count > 0)
    }

    const salvarUsuario = async () => {
        try {
            if(nome.trim().length == 0)
                return Alert.alert('Erro', 'Seu nome está vazio.')

            await database.write(async () => {
                await database.get('Usuario').create(usuario => {
                    usuario.nome = nome
                })
            })

            Alert.alert(
                'Informações registradas',
                'Suas informações foram salvas. Você irá entrar no App.'
            )

            verificarUsuarioExiste()
        } catch (error) {
            console.log(error)
            Alert.alert('', error)
        }
    }

    //------------------| BIOMETRIA |------------------//
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

    //------------------------------------//
    useEffect(() => {
        verificarUsuarioExiste()
        verificarSuporteBiometrico()
    }, [])

    return (
        <View style={[mainStyles.container, styles.body(isLogado)]}>
            <View style={styles.container_logo(isLogado)}>
                <Image 
                    source={require('../../../assets/logo_primaria.png')}
                    style={{ width: 200, height: 200}}
                />
                <Text style={styles.sobrou}>Sobrou!</Text>
            </View>
            {isLogado ? (
                <>
                    <Text style={styles.mensagem}>Clique no botão abaixo para acessar o app.</Text>
                </>
            ) : ( 
                <View style={styles.container_cadastro_inicial}>
                    <Text style={styles.container_cadastro_inicial.titulo}>Seja bem-vindo!</Text>
                    <Text style={styles.container_cadastro_inicial.desc}>Preencha as informações abaixo para prosseguir.</Text>
                    <TextInput
                        style={mainStyles.input}
                        placeholderTextColor={cores.cinza_texto}
                        value={nome}
                        onChangeText={text => setNome(text)}
                        placeholder="Informe seu nome"
                        autoCorrect={true}
                    />

                    <View style={styles.container_ativar_biometria}>
                        <Text style={styles.container_ativar_biometria.titulo}>Ativar biometria p/ entrar</Text>
                        <Switch 
                            trackColor={{ false: cores.cinza_200, true: cores.secundaria }}
                            thumbColor={ativarBiometria ? cores.primaria : cores.cinza_texto}
                            value={ativarBiometria}
                            onValueChange={() => setAtivarBiometria(valAnterior => !valAnterior)}
                        />
                    </View>
                </View>
            )}

            <BotaoFuncoes 
                texto={"Entrar"} 
                corPrincipal={cores.primaria}
                corSegundaria={cores.branco}
                renderizarIcone={(cor) => <Ionicons name="enter" size={tamanhos.lg} color={cor} />}
                onPress={isLogado ? handleAutenticao : salvarUsuario}
                largura={(Dimensions.get('screen').width * 0.75)/100}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: (isLogado) => ({
        flex: 1,
        alignItems: 'center',
        justifyContent: isLogado ? 'center' : 'flex-top'
    }), 
    container_logo: (isLogado) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: isLogado ? 0 : Dimensions.get('screen').height * 0.08 
    }),
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
    },
    container_cadastro_inicial: {
        width: Dimensions.get('screen').width * 0.75,
        marginTop: 20,

        titulo: {
            fontFamily: fontes.bold,
            fontSize: tamanhos.md * 1.2,
            lineHeight: (tamanhos.md * 1.2) + 10,
            textAlign: 'center',
            color: cores.preto
        },

        desc: { 
            fontFamily: fontes.regular, 
            fontSize: tamanhos.sm, 
            textAlign: 'center', 
            fontStyle: 'italic', 
            marginBottom: 20,
            color: cores.cinza_700
        }
    },
    container_ativar_biometria: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBlock: 15,

        titulo: { 
            fontFamily: fontes.medium, 
            fontSize: tamanhos.sm, 
            lineHeight: tamanhos.sm + 10
        }
    }
})