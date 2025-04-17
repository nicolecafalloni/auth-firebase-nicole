// Nicole de Oliveira Cafalloni
import React, { useState } from "react";
import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ImageBackground 
} from "react-native";

const CalculadoraIMC = () => {
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [imc, setIMC] = useState(null);
    const [categoria, setCategoria] = useState("");

    const calcularIMC = () => {
        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura) / 100; // Converter altura para metros

        if (!pesoNum || !alturaNum || alturaNum <= 0) {
            setIMC(null);
            setCategoria("Valores inválidos");
            return;
        }

        const resultadoIMC = pesoNum / (alturaNum * alturaNum);
        setIMC(resultadoIMC.toFixed(1));

        if (resultadoIMC < 18.5) setCategoria("Baixo peso");
        else if (resultadoIMC < 24.9) setCategoria("Peso normal");
        else if (resultadoIMC < 29.9) setCategoria("Sobrepeso");
        else setCategoria("Obesidade");
    };

    return (
        <ImageBackground 
            source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }} 
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.titulo}>Calculadora de IMC</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Peso (kg)"
                    keyboardType="numeric"
                    value={peso}
                    onChangeText={setPeso}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Altura (cm)"
                    keyboardType="numeric"
                    value={altura}
                    onChangeText={setAltura}
                />

                <TouchableOpacity onPress={calcularIMC} style={styles.botao}>
                    <Text style={styles.botaoTexto}>Calcular</Text>
                </TouchableOpacity>

                {imc && (
                    <View style={styles.resultadoContainer}>
                        <Text style={styles.resultadoText}>IMC: {imc}</Text>
                        <Text style={styles.resultadoCategoria}>{categoria}</Text>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

export default CalculadoraIMC;

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
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FF0000",
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 18,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#FF0000",
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
    resultadoContainer: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#FF0000",
        padding: 15,
        borderRadius: 10,
    },
    resultadoText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    resultadoCategoria: {
        fontSize: 18,
        marginTop: 5,
        color: "#fff",
    },
});
