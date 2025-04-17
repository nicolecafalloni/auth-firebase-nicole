import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
} from "@firebase/firestore";
import { db } from "../firebaseConfig";

const AdicionarJogador = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [altura, setAltura] = useState("");
  const [camisa, setCamisa] = useState("");
  const [nascimento, setNascimento] = useState("");

  const addJogador = async () => {
    if (!nome || !altura || !camisa || !nascimento) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {

      const jogadoresCollection = collection(db, "real-madrid");

      const [day, month, year] = nascimento.split("/");
      const nascimentoDate = new Date(`${year}-${month}-${day}`);
      const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);

      await addDoc(jogadoresCollection, {
        nome,
        altura: parseFloat(altura),
        camisa: parseInt(camisa),
        nascimento: nascimentoTimestamp,
      });

      Alert.alert("Sucesso", "Jogador adicionado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao adicionar jogador: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o jogador.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Altura:</Text>
          <TextInput
            style={styles.input}
            placeholder="Altura"
            value={altura}
            onChangeText={setAltura}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Camisa:</Text>
          <TextInput
            style={styles.input}
            placeholder="Camisa"
            value={camisa}
            onChangeText={setCamisa}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Nascimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nascimento (dd/mm/aaaa)"
            value={nascimento}
            onChangeText={setNascimento}
          />

          <Pressable style={styles.button} onPress={addJogador}>
            <Text style={styles.buttonText}>Adicionar Jogador</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 30,
    width: "90%",
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF0000",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 4,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#FF0000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdicionarJogador;
