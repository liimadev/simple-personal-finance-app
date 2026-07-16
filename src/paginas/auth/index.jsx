import { View, Text, StyleSheet, Button } from "react-native";

export default function PaginaAuth ({ navigation }) {
    return (
        <View style={styles.body}>
            <Text>Olá, mundo! Essa é a Página Auth.</Text>
            <Button title="Entrar" onPress={() => navigation.replace('main')} />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})