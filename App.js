import { useState, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import { useAudioPlayer } from "expo-audio";

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
    "Todo código difícil fica mais fácil depois do primeiro console.log.",
    "Se deu erro, pelo menos agora você sabe onde não funciona.",
    "Um commit por vez e o projeto sai do papel.",
    "Programar é ensinar o computador a cometer erros mais rápido que você.",
    "Não tenha medo do erro. Tenha medo de não testar.",
    "Às vezes o código funciona. Às vezes você descobre por quê.",
    "O segredo não é saber tudo, é saber onde procurar.",
    "Persistência é apertar F5 mais uma vez e acreditar.",
    "Código limpo começa com uma mente organizada.",
    "Confira sempre mais de uma vez. Não custa nada e vale muito."
  ]

  const [frase, setFrase] = useState("")
  const [aberto, setAberto] = useState(false)
  const [contador, setContador] = useState(0)
  const [ultimaFrase, setUltimaFrase] = useState("")
  const [favorita, setFavorita] = useState("")
  const [corFundo, setCorFundo] = useState("#8591ff")

  const escala = useRef(new Animated.Value(1)).current
  const opacidade = useRef(new Animated.Value(1)).current

  const player = useAudioPlayer(require("./assets/biscoito-som.mp3"))

  const cores = [
    "#8591ff",
    "#9b8cff",
    "#79c7ff",
    "#7ed6a5",
    "#ffd166",
    "#ff9f68",
    "#ff8fa3",
    "#c49cff",
  ];

  function abrirBiscoito() {
    sortearFrase()
    setContador((valorAtual) => valorAtual + 1)
    setAberto(true)
    tocarSom();
  }

  function quebrarOutro() {
    sortearFrase()
    setContador((valorAtual) => valorAtual + 1)
    tocarSom()
  }

  function limparContador() {
    setContador(0);
    setFrase("")
    setUltimaFrase("")
    setAberto(false)
  }

  function voltarBiscoito() {
    setFrase("")
    setAberto(false)
  }

  function sortearFrase() {
    let indice;
    let fraseSorteada;

    do {
      indice = Math.floor(Math.random() * frases.length)
      fraseSorteada = frases[indice]
    } while (fraseSorteada === ultimaFrase)

      setFrase(fraseSorteada);
      setUltimaFrase(fraseSorteada)

      setCorFundo(cores[indice % cores.length])

      animarImagem()
  }

  function animarImagem() {
    escala.setValue(0.7)
    opacidade.setValue(0)

    Animated.parallel([
      Animated.spring(escala, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),

      Animated.timing(opacidade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start()
  }

  function tocarSom() {
    try {
      player.seekTo(0)
      player.play()
    } catch (error){
      console.log("Erro ao tocar som: ", error)
    }
  }

  function alternarFavorita() {
    if (favorita === frase) {
      setFavorita("")
    } else {
      setFavorita(frase)
    }
  }

  return (
    <ScrollView style={{backgroundColor: corFundo}} contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Biscoito da Sorte</Text>
      <Text style={styles.contador}>Biscoitos quebrados: {contador}</Text>

      {!aberto ? (
        <>
        <Animated.View style={{transform: [{scale: escala}], opacity: opacidade,}}>
          <Pressable onPress={abrirBiscoito}>
            <Image
              source={require("./assets/biscoito.svg")}
              style={styles.imagem}
              resizeMode="contain"
            />
          </Pressable>
        </Animated.View>
        <Text style={styles.instrucao}>Clique no biscoito e se motive !</Text>

          {ultimaFrase !== "" && (
            <View style={styles.ultimaCaixa}>
              <Text style={styles.ultimaTitulo}>📜 Última frase</Text>
              <Text style={styles.ultimaFrase}>"{ultimaFrase}"</Text>
            </View>
          )}
        </>
      ) : (
        <>
        <Animated.View style={{transform: [{scale: escala}], opacity: opacidade,}}>
          <Image
            source={require("./assets/biscoito-quebrado.svg")}
            style={styles.imagem}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.caixaFrase}>
          <Text style={styles.frase}>"{frase}"</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.botaoFavorito, pressed && styles.botaoPressionado,]} onPress={alternarFavorita}>
            <Text style={styles.textoBotao}>{favorita === frase ? "⭐ Frase favorita" : "☆ Favoritar frase"}</Text>
        </Pressable>

        {favorita === frase && (
            <Text style={styles.avisoFavorito}>⭐ Essa é sua frase favorita!</Text>
        )}

        {contador >= 5 && ( 
          <Text style={styles.mensagemEspecial}> 🎉 Você já quebrou 5 biscoitos! Continue ! </Text> 
        )}

        <Pressable style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]} onPress={quebrarOutro}>
          <Text style={styles.textoBotao}>🍪 Quebrar outro</Text> 
        </Pressable>

        <Pressable style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]} onPress={voltarBiscoito}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </Pressable>

        {ultimaFrase !== "" && (
          <View style={styles.ultimaCaixa}>
            <Text style={styles.ultimaTitulo}>📜 Última frase sorteada</Text>
            <Text style={styles.ultimaFrase}>"{ultimaFrase}"</Text>
          </View>
        )}
      </>
      )
      }
        <Pressable style={({ pressed }) => [styles.botaoLimpar, pressed && styles.botaoLimparPressionado]} onPress={limparContador}>
          <Text style={styles.textoBotao}>🗑️ Limpar contador</Text>
        </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  titulo : {
    fontSize: 40,
    fontWeight: "bold",
    color: "#353c7c",
    marginBottom: 30,
  },

  contador: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#353c7c",
    marginBottom: 25,
  },

  imagem: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  instrucao: {
    fontSize: 20,
    color: "#353c7c",
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
    fontSize: 20,
    textAlign: "center",
    color: "#333333",
    fontStyle: "italic",
    fontWeight: "600"
  },

  mensagemEspecial: {
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#353c7c", 
    textAlign: "center", 
    marginBottom: 15,
  },

  botao: {
    backgroundColor: "#353c7c",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderColor: "#10164f",
    borderWidth: 3,
    marginBottom: 10
  },

  botaoFavorito: {
    backgroundColor: "#f0a500",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 8,
  },

  botaoPressionado: {
    backgroundColor: "#4a52a0",
    transform: [{ scale: 1.03 }],
    borderColor: "#252b69",
  },

  botaoLimpar: { 
    marginTop: 15, 
    backgroundColor: "#8b2635", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
  }, 
  
  botaoLimparPressionado: { 
    backgroundColor: "#a83245", 
    transform: [{ scale: 1.03 }], 
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  avisoFavorito: {
    fontSize: 14,
    color: "#353c7c",
    fontWeight: "bold",
    marginBottom: 10,
  },

  ultimaCaixa: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },

  ultimaTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#353c7c",
    textAlign: "center",
    marginBottom: 5,
  },

  ultimaFrase: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    fontStyle: "italic",
  },
});