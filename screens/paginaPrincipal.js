// Nicole de Oliveira Cafalloni

import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, ImageBackground, Pressable } from "react-native";

export default function paginaPrincipal({ navigation }) {
    return (
        <ImageBackground source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.textPrincipal}>Navegações</Text>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("sobreNos")}><Text style={styles.textNavegacao}>Sobre nós</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("listarJogadores")}><Text style={styles.textNavegacao}>Listar Jogadores</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("editarPerfil")}><Text style={styles.textNavegacao}>Editar Perfil</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("lampada")}><Text style={styles.textNavegacao}>Lampada</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("imc")}><Text style={styles.textNavegacao}>IMC</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("adicionarJogador")}><Text style={styles.textNavegacao}>Adicionar Jogador</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("editarJogador")}><Text style={styles.textNavegacao}>Editar Jogador</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("uploadImg")}><Text style={styles.textNavegacao}>Upload Foto</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("uploadVideo")}><Text style={styles.textNavegacao}>Upload Vídeo</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("listarVideo")}><Text style={styles.textNavegacao}>Listar Vídeo</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("listarImagem")}><Text style={styles.textNavegacao}>Listra Imagem</Text></Pressable>
                <Pressable style={styles.botao} onPress={() => navigation.navigate("RealizarLogin")}><Text style={styles.textNavegacao}>Sair</Text></Pressable>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    textPrincipal: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 20,
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coluna: {
        flex: 1,
    },
    botao: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: 5,
        alignItems: "center",
    },
    textNavegacao: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    }
});

