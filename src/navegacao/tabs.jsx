import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import PaginaHome from '../paginas/home'
import PaginaFinancas from '../paginas/financas'
import PaginaSaude from '../paginas/saude'
import { StyleSheet, Text, View } from "react-native"
import { cores, fontes, tamanhos } from "../tema"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BotaoHome from "../componentes/BotaoHome.jsx"
const Tab = createBottomTabNavigator()

export default function AppTab () {

    return (
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{ 
                headerShown: false,
                animation: 'shift',
                tabBarStyle: styles.tab_container
            }}
        >
            <Tab.Screen 
                name="Financas" 
                component={PaginaFinancas}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={[styles.label, focused && styles.label_focado]}>Finanças</Text>
                        )
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <FontAwesome6 name="money-bill-transfer" size={tamanhos.lg} color={ focused ? cores.primaria : cores.cinza} />
                        )
                    }
                }}
            />

            <Tab.Screen 
                name="Home" 
                component={PaginaHome}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <BotaoHome focused={focused} />
                        )
                    }
                }}    
            />

            <Tab.Screen 
                name="Saude"
                component={PaginaSaude}
                options={{
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={[styles.label, focused && styles.label_focado]}>Saúde</Text>
                        )
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <FontAwesome6 name="circle-dollar-to-slot" size={tamanhos.lg} color={ focused ? cores.primaria : cores.cinza} />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tab_container: {
        backgroundColor: cores.branco,
        borderTopWidth: 0.5,
        borderTopColor: cores.cinza
    },
    label: {
        color: cores.cinza,
        fontFamily: fontes.medium,
        fontSize: tamanhos.xs
    },
    label_focado: {
        color: cores.primaria
    }
})