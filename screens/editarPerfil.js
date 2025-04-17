// Nicole de Oliveira Cafalloni
import React, { useState } from "react";
import { Text, View, ImageBackground, Image, StyleSheet, TextInput, Pressable } from "react-native";

export default function EditarPerfil() {
    const [usuario, setUsuario] = useState({
        email: "endrick.felipe@gmail.com",
        senha: "707070",
        nome: "Endrick Felipe",
    });

    const [imgAvatar, setImgAvatar] = useState(require("../assets/img-endrick.jpg"));

    const trocarImagem = () => {
        setImgAvatar(
            imgAvatar === require("../assets/img-endrick.jpg") 
            ? { uri: "https://conteudo.imguol.com.br/c/esporte/91/2024/03/26/endrick-comemora-gol-marcado-pela-selecao-brasileira-contra-a-espanha-em-amistoso-1711489763915_v2_450x450.jpg.webp" }
            : require("../assets/img-endrick.jpg")
        );
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Image style={styles.imgAvatar} source={imgAvatar} />

                <Pressable onPress={trocarImagem} style={styles.btnTrocarImagem}>
                    <Text style={styles.text}>Trocar Imagem</Text>
                </Pressable>

                <View style={styles.infoContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput
                            style={styles.inputPerfil}
                            placeholder="Digite seu nome"
                            value={usuario.nome}
                            onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.inputPerfil}
                            placeholder="Digite seu email"
                            value={usuario.email}
                            onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Senha:</Text>
                        <TextInput
                            style={styles.inputPerfil}
                            placeholder="Digite sua senha"
                            value={usuario.senha}
                            onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
                            secureTextEntry
                        />
                    </View>
                </View>
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
    imgAvatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: "#FF0000",
    },
    btnTrocarImagem: {
        backgroundColor: "#FF0000",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    infoContainer: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
        color: "#FF0000",
    },
    inputPerfil: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#FF0000",
        borderRadius: 10,
        fontSize: 16,
    },
});
