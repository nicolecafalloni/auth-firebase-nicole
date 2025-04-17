// Nicole de Oliveira Cafalloni
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, ImageBackground } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MostrarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "real-madrid"));
                const listaUsuarios = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        nascimento: data.nascimento 
                            ? new Date(data.nascimento.seconds * 1000).toLocaleDateString("pt-BR") 
                            : "Data não informada",
                    };
                });
                setUsuarios(listaUsuarios);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        buscarDados();
    }, []); 

    return (
        <ImageBackground 
            source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }} 
            style={styles.background}
        >
            <View style={styles.container}>
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View style={styles.elementos}>
                            <Text style={styles.inforTextNome}>Nome: {item.nome}</Text>
                            <Text style={styles.inforText}>Nascimento: {item.nascimento}</Text>
                            <Text style={styles.inforText}>Camisa: {item.camisa}</Text>
                            <Text style={styles.inforText}>Altura: {item.altura}m</Text>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

export default MostrarUsuarios;

const styles = StyleSheet.create({
    background: {
        flex: 1, // Garante que o fundo ocupe toda a tela
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    container: {
        flex: 1,
        width: "90%",
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    elementos: {
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
    },
    inforText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    inforTextNome: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 18,
        color: "#888",
        marginTop: 20,
    },
});
