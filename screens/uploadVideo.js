import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import s3 from '../awsConfig'; // Configuração do S3

const S3_BUCKET = "bucket-storage-senai-25";

export default function UploadVideo({ navigation }) {
    const [video, setVideo] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [category, setCategory] = useState("");

    const pickVideo = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'video/*',
                copyToCacheDirectory: true,
            });

            const asset = result.assets && result.assets.length > 0 ? result.assets[0] : result;

            if (asset && asset.uri) {
                setVideo({
                    uri: asset.uri,
                    name: asset.name,
                    type: asset.mimeType || "video/mp4",
                });

            }else{
                alert('Erro ao selecionar o arquivo');
            }
        } catch (error) {
            console.error("Erro ao selecionar vídeo:", error);
            alert("Erro", "Não foi possível selecionar o vídeo.");
        }
    };

    const uploadVideo = async () => {
        if (!video) {
            Alert.alert("Erro", "Por favor, selecione um vídeo primeiro.");
            return;
        }

        try {
            setUploading(true);

            const response = await fetch(video.uri);
            const blob = await response.blob();

            const fileName = `video_${Date.now()}.mp4`;

            const uploadParams = {
                Bucket: 'bucket-storage-senai-25',
                Key: `videos/${fileName}`,
                Body: blob,
                ContentType: 'video/mp4',
            };

            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    console.error("Erro no upload:", err);
                    Alert.alert("Erro", "Erro ao fazer upload do vídeo.");
                    setUploading(false);
                    return;
                }

                Alert.alert("Sucesso", "Vídeo enviado com sucesso!");
                setVideo(null);
                setUploading(false);
                navigation.navigate("listarVideo"); // navega após upload
            });

        } catch (error) {
            console.error("Erro ao enviar vídeo:", error);
            Alert.alert("Erro", "Erro ao enviar vídeo.");
            setUploading(false);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/fotos-gratis/pessoas-no-estadio-de-futebol_23-2151548545.jpg' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Upload de Vídeo</Text>

                <TouchableOpacity
                    style={[styles.button, uploading && styles.buttonDisabled]}
                    onPress={pickVideo}
                    disabled={uploading}
                >
                    <Text style={styles.buttonText}>Selecionar Vídeo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, uploading && styles.buttonDisabled]}
                    onPress={uploadVideo}
                    disabled={uploading}
                >
                    <Text style={styles.buttonText}>
                        {uploading ? 'Enviando...' : 'Enviar Vídeo'}
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
