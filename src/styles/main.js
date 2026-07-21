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
  },
  container_input: {
      marginTop: 15
  },
  input: {
      backgroundColor: cores.branco,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: cores.cinza,
      borderRadius: 5,
      fontFamily: fontes.medium,
      fontSize: tamanhos.sm,
      lineHeight: tamanhos.sm + 10
  },
  input_focado: {
      borderColor: cores.primaria
  },
  input_placeholder: {
      color: cores.cinza_texto,
      fontFamily: fontes.medium,
      fontSize: tamanhos.md,
      lineHeight: tamanhos.md * 1.5
  },
  item_dropdown: {
      color: cores.preto
  },
  label: {
      fontFamily: fontes.semibold,
      fontSize: tamanhos.md,
      lineHeight: tamanhos.md * 1.5,
      marginBottom: 5
  }
})