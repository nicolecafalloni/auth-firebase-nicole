import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Video } from "expo-av";
import s3 from "../awsConfig"; // Corrigido o caminho e a sintaxe


const bucketName = 'bucket-storage-senai-25';

export default function ListarVideosPorCategoria({ navigation }) {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Buscar categorias (pastas) do S3
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: "videos/",
          Delimiter: "/",
        })
        .promise();

      const folders = response.CommonPrefixes.map((prefix) => {
        const folderPath = prefix.Prefix;
        return folderPath.replace("videos/", "").replace("/", "");
      });

      setCategories(folders);

      if (folders.length > 0) {
        setCategory(folders[0]);
      }
    } catch (error) {
      console.error("Erro ao carregar categorias: ", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Buscar vídeos da categoria selecionada
  const fetchVideos = async () => {
    if (!category) return;

    setLoading(true);
    const prefix = `videos/${category}/`;

    try {
      const response = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: prefix,
        })
        .promise();

      const videoFiles = response.Contents?.filter(
        (file) => file.Size > 0 && file.Key.endsWith(".mp4")
      );

      const videoURLs = videoFiles?.map((file) => ({
        key: file.Key,
        name: file.Key.split("/").pop(),
        url: `https://${bucketName}.s3.amazonaws.com/${encodeURI(file.Key)}`,
      })) || [];

      setVideos(videoURLs);
    } catch (error) {
      console.error("Erro ao carregar vídeos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();

  }, []);  

  useEffect(() => {

    if (category){
      fetchVideos();
    };

  },[category]);

  return (
    <View style={styles.container}>
      {/* Aqui você pode adicionar o conteúdo visual como Picker, ScrollView de vídeos, etc. */}
      <Text style={styles.title}>Vídeos por Categoria</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
