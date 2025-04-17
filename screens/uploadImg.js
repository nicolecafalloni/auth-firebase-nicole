import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import s3 from "../awsConfig";

const S3_BUCKET = "bucket-storage-senai-25";

export default function UploadImg({ navigation }) {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            Alert.alert("Erro", "Por favor, selecione uma imagem primeiro.");
            return;
        }

        try {
            setUploading(true);

            // Criar um nome único para o arquivo
            const timestamp = Date.now();
            const filename = `image_${timestamp}.jpg`;

            // Converter a URI para blob
            const response = await fetch(image);
            const blob = await response.blob();

            // Criar referência do storage
            const storageRef = `imagens/${filename}`;


            const params = {
                Bucket: S3_BUCKET,
                Key: storageRef,
                Body: blob,
                ContentType: "image/jpeg"
            };

            s3.upload(params, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    alert("Sucesso, Imagem enviada com sucesso!", data.Location);
                    setImage(null);
                    navigation.navigate("listarImagem");
                }
            })

        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
            alert("Erro, Não foi possível enviar a imagem. Erro: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg?t=st=1743682380~exp=1743685980~hmac=58a952ec45d8b9ead104a54ee1ebadd63bbf46877e7f1029bad1e5e0e60ec341&w=740' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Upload de Foto</Text>

                <TouchableOpacity
                    style={[styles.button, uploading && styles.buttonDisabled]}
                    onPress={pickImage}
                    disabled={uploading}
                >
                    <Text style={styles.buttonText}>Selecionar Foto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, uploading && styles.buttonDisabled]}
                    onPress={uploadImage}
                    disabled={uploading}
                >
                    <Text style={styles.buttonText}>
                        {uploading ? 'Enviando...' : 'Enviar Foto'}
                    </Text>
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
    button: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: "100%",
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
