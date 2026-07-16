import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import mainTabs from "./tabs.jsx"
import PaginaAuth from "../paginas/auth";
import AppTab from "./tabs.jsx";
const Stack = createNativeStackNavigator()

export default function RootNavigator () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="auth" component={PaginaAuth} options={{ headerShown: false }}/>
                <Stack.Screen name="main" component={AppTab} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}