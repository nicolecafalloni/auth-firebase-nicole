import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, ActivityIndicator, StyleSheet, Text } from 'react-native';
import s3 from '../awsConfig';

const BUCKET_NAME = "bucket-storage-senai-25";

export default function ListarImagens({ navigation }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);   

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await s3.
          listObjectsV2({ Bucket: 'bucket-storage-senai-25'})
          .promise();
        
        const imageFiles = response.Contents.filter((file) =>
          file.Key.match(/\.(jpg|jpeg|png)$/i)
        );

        const imageURLs = imageFiles.map((file) => ({
          name: file.Key.split("/").pop(),
          url: `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`,
        }));

        setImages(imageURLs);
      
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {images.length > 0 ? (
        images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: img.url }} style={styles.image} />
            <Text>{img.name}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhuma imagem encontrada.</Text>
      )}
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});
