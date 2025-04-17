// Nicole de Oliveira Cafalloni
import React from "react";
import { Text, View, ImageBackground, StyleSheet, Image } from "react-native";

export default function sobreNos(){
    return(
        <ImageBackground source={{uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740'}} style={styles.background}>
            <View style = {styles.container}>
             <Text style={styles.textPrinc}>Real Madrid</Text>
            <Text style={styles.informacao}>
                O Real Madrid é um dos clubes de futebol mais vitoriosos do mundo, fundado em 1902, em Madrid. Ele acumula 15 títulos da Liga dos Campeões da UEFA e 35 da La Liga, entre outros troféus.
                Momentos marcantes incluem a Era de Ouro nos anos 1950, liderada por Alfredo Di Stéfano, e sua famosa rivalidade com o Barcelona, conhecida como "El Clásico". O clube também tem o icônico estádio Santiago Bernabéu, um símbolo do futebol mundial. Um gigante do esporte!</Text>
            <Image style={styles.imgRealMadrid} source={require('../assets/img-real-madrid.jpg')}></Image> 
            </View>

        </ImageBackground>
    );
;}

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
    textPrinc: {
        fontSize: 30,
        color: '#FF0000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    informacao: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 20,
    },
    imgRealMadrid: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    }
});