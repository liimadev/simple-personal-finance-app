import { StyleSheet } from "react-native";
import { cores, fontes, tamanhos } from '../tema'

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.branco
  },
  texto: { 
    fontFamily: fontes.medium,
    fontSize: tamanhos.sm
  },
  tabText: {
    fontSize: tamanhos.xs,
    fontFamily: fontes.regular,
    color: cores.preto
  }
})