import { View, Text } from "react-native";
import { mainStyles } from "../../styles/main";

export default function PaginaHome ({ navigation }) {
    return (
        <View style={mainStyles.container}>
            <Text style={mainStyles.texto}>Olá, mundo! Essa é a Página Saúde.</Text>
        </View>
    )
}