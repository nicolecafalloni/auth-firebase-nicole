import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Modal,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
} from "react-native";
import {
    doc,
    updateDoc,
    deleteDoc,
    getFirestore,
    Timestamp,
    collection,
    getDocs
} from "@firebase/firestore";
import { db } from "../firebaseConfig";

const EditarExcluirJogador = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [jogadorAtual, setJogadorAtual] = useState(null);
    const [nome, setNome] = useState("");
    const [altura, setAltura] = useState("");
    const [camisa, setCamisa] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [loading, setLoading] = useState(true);
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        carregarJogadores();
    }, []);

    const carregarJogadores = async () => {
        try {
            const jogadoresRef = collection(db, "real-madrid");
            const snapshot = await getDocs(jogadoresRef);
            
            const jogadoresData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                nascimento: formatarData(doc.data().nascimento)
            }));
            
            setJogadores(jogadoresData);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao carregar jogadores:", error);
            Alert.alert("Erro", "Não foi possível carregar os jogadores.");
            setLoading(false);
        }
    };

    const formatarData = (timestamp) => {
        if (!timestamp) return "";
        const data = timestamp.toDate();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const editarJogador = (jogador) => {
        setJogadorAtual(jogador);
        setNome(jogador.nome);
        setAltura(jogador.altura.toString());
        setCamisa(jogador.camisa.toString());
        setNascimento(jogador.nascimento);
        setModalVisible(true);
    };

    const salvarJogador = async () => {
        try {
            const jogadorRef = doc(db, "real-madrid", jogadorAtual.id);

            const [day, month, year] = nascimento.split("/");
            const nascimentoDate = new Date(`${year}-${month}-${day}`);
            const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);

            await updateDoc(jogadorRef, {
                nome,
                altura: parseFloat(altura),
                camisa: parseInt(camisa),
                nascimento: nascimentoTimestamp,
            });

            const atualizados = jogadores.map((j) =>
                j.id === jogadorAtual.id
                    ? {
                        ...j,
                        nome,
                        altura: parseFloat(altura),
                        camisa: parseInt(camisa),
                        nascimento,
                    }
                    : j
            );

            setJogadores(atualizados);
            setModalVisible(false);
            Alert.alert("Sucesso", "Jogador atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar jogador:", error);
            Alert.alert("Erro", "Não foi possível salvar o jogador.");
        }
    };

    const deletarJogador = async (id) => {
        try {
            await deleteDoc(doc(db, "real-madrid", id));
            setJogadores(jogadores.filter((j) => j.id !== id));
            Alert.alert("Sucesso", "Jogador excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar jogador:", error);
            Alert.alert("Erro", "Não foi possível deletar o jogador.");
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.aviso}>Carregando jogadores...</Text>
            </View>
        );
    }

    return (
        <ImageBackground 
            source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }} 
            style={styles.background}
        >
            <View style={styles.container}>
                {!jogadores || jogadores.length === 0 ? (
                    <Text style={styles.aviso}>Nenhum jogador cadastrado.</Text>
                ) : (
                    <FlatList
                        data={jogadores}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.jogadorItem}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.inforText}>Altura: {item.altura}m</Text>
                                <Text style={styles.inforText}>Camisa: {item.camisa}</Text>
                                <Text style={styles.inforText}>Nascimento: {item.nascimento}</Text>
                                <View style={styles.botoes}>
                                    <TouchableOpacity
                                        onPress={() => editarJogador(item)}
                                        style={styles.botaoEditar}
                                    >
                                        <Text style={styles.botaoTexto}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deletarJogador(item.id)}
                                        style={styles.botaoExcluir}
                                    >
                                        <Text style={styles.botaoTexto}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitulo}>Editar Jogador</Text>
                        <TextInput
                            placeholder="Nome"
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TextInput
                            placeholder="Altura (ex: 1.75)"
                            style={styles.input}
                            value={altura}
                            onChangeText={setAltura}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Número da Camisa"
                            style={styles.input}
                            value={camisa}
                            onChangeText={setCamisa}
                            keyboardType="numeric"
                        />
                        <TextInput
                            placeholder="Nascimento (dd/mm/aaaa)"
                            style={styles.input}
                            value={nascimento}
                            onChangeText={setNascimento}
                        />
                        <View style={styles.botoesModal}>
                            <TouchableOpacity
                                onPress={salvarJogador}
                                style={styles.botaoSalvar}
                            >
                                <Text style={styles.botaoTexto}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.botaoCancelar}
                            >
                                <Text style={styles.botaoTexto}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    jogadorItem: {
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
    },
    nome: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    inforText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    aviso: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#888",
    },
    botoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    botaoEditar: {
        backgroundColor: "#4caf50",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    botaoExcluir: {
        backgroundColor: "#f44336",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    botaoTexto: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    botoesModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    botaoSalvar: {
        backgroundColor: "#2196f3",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    botaoCancelar: {
        backgroundColor: "#9e9e9e",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
});

export default EditarExcluirJogador;
