import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { globalStyles } from '../styles/globalStyles';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from "firebase/app";

const registerUser = async (email, password, nome, imageUri) => {
  const auth = getAuth(getApp());
  const firestore = getFirestore(getApp());
  const storage = getStorage(getApp());

  try {
    // Criação do usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload da imagem no Firebase Storage
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `profile_images/${user.uid}/${filename}`);
    
    await uploadBytes(storageRef, blob);
    const photoURL = await getDownloadURL(storageRef);

    // Salvando dados no Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: email,
      nome: nome,
      photoURL: photoURL,
    });

    console.log("Usuário registrado e imagem salva no Storage");
    return user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    Alert.alert("Erro", "Não foi possível registrar o usuário.");
  }
};

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (email && password && nome && imageUri) {
      await registerUser(email, password, nome, imageUri);
      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Usuário</Text>
        
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Escolher imagem de perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    padding: 30,
    width: "90%",
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
