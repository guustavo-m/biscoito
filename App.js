import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const frases = [
    "Grandes coisas começam com pequenos passos.",
    "Hoje pode ser o começo de algo incrível.",
    "Não pare até o código rodar.",
    "Codar é transformar café em soluções.",
    "O único bug que realmente não tem solução é deixar de tentar.",
    "Seu esforço de hoje será resultado de amanhã.",
    "Nem todo bug é um problema. Às vezes é uma feature.",
    "Continue. Até o código perfeito começou com erro.",
    "A sorte ajuda quem também faz o comit.",
    "Respire. Salve. Tente denovo.",
  ]

  const [frase, setFrase] = useState("")
  const [aberto, setAberto] = useState(false)

  function abrirBiscoito() {
    const indice = Math.floor(Math.random() * frases.length)
    const fraseSorteada = frases[indice]

    setFrase(fraseSorteada)
    setAberto(true)
  }

  function voltarBiscoito() {
    setFrase("")
    setAberto(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Biscoito da Sorte</Text>

      {!aberto ? (
        <>
          <Pressable onPress={abrirBiscoito}>
            <Image
              source={require("./assets/biscoito.svg")}
              style={styles.imagem}
              resizeMode="contain"
            />
          </Pressable>

          <Text style={styles.instrucao}>Toque no biscoito para quebrar</Text>
        </>
      ) : (
        <>
          <Image
            source={require("./assets/biscoito-quebrado.svg")}
            style={styles.imagem}
            resizeMode="contain"
          />


        <View style={styles.caixaFrase}>
          <Text style={styles.frase}>"{frase}"</Text>
        </View>

        <Pressable style={styles.botao} onPress={voltarBiscoito}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </Pressable>
      </>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E7",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  titulo : {
    fontSize: 32,
    fontWeight: "bold",
    color: "#7A4A16",
    marginBottom: 30,
  },

  imagem: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  instrucao: {
    fontSize: 16,
    color: "#7A4A16",
    marginBottom: 20,
  },

  caixaFrase: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },

  frase: {
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
    fontStyle: "italic",
  },

  botao: {
    backgroundColor: "#D98620",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});