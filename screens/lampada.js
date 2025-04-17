// Nicole de Oliveira Cafalloni
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const AlternarFundo = () => {
    const [acesa, setAcesa] = useState(false); // Estado inicial "Apagada"

    // Alterna entre "Acesa" e "Apagada" ao clicar no botão
    const alternarFundo = () => {
        setAcesa(!acesa);
    };

    return (
        <View style={[styles.container, acesa ? styles.acesa : styles.apagada]}>
            <Text style={styles.estadoText}>
                Estado: {acesa ? "Acesa 🔥" : "Apagada ❌"}
            </Text>

            <TouchableOpacity onPress={alternarFundo} style={styles.botao}>
                <Text style={styles.botaoTexto}>
                    {acesa ? "Apagar 🔄" : "Acender 🔆"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AlternarFundo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    acesa: {
        backgroundColor: "#FFD700",
    },
    apagada: {
        backgroundColor: "#333333",
    },
    estadoText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000",
    },
    botao: {
        backgroundColor: "#FF0000",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    botaoTexto: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});
