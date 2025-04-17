// Nicole de Oliveira Cafalloni
import React, { useState } from "react";
import {
    View,
    ScrollView,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
} from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig";

const RealizarLogin = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const tentarLogar = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate("PaginaPrincipal");
            })
            .catch((error) => {
                console.error("Login Falhou", error);
            });
    };

    return (
        <ImageBackground style={styles.background} source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }}>
            <View style={styles.fundoLogin}>
                <Image style={styles.logoSenai} source={require('../assets/img-logo-senai.png')} />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={tentarLogar}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Text style={styles.textCadastrar} onPress={() => navigation.navigate("cadastrarUsuario")}>Cadastrar</Text>
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
    fundoLogin: {
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
    logoSenai: {
        width: 350,
        height: 100,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#FF0000",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#FF0000",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    textCadastrar: {
        color: "#FF0000",
        fontSize: 16,   
        marginTop: 10,
        fontWeight: "bold",
    }
});

export default RealizarLogin;