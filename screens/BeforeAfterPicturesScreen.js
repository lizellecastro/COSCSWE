import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firestore } from '../firebase'; // Import your Firebase Firestore instance

export default function BeforeAfterPicturesScreen() {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [comparisonImages, setComparisonImages] = useState([]);

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (type === 'before') {
        setBeforeImage(result.uri);
      } else {
        setAfterImage(result.uri);
      }
    }
  };

  const uploadImagesToFirestore = async () => {
    try {
      const beforeImageRef = await uploadImageToFirestore(beforeImage, 'before');
      const afterImageRef = await uploadImageToFirestore(afterImage, 'after');
      setComparisonImages([...comparisonImages, { before: beforeImageRef, after: afterImageRef }]);
      Alert.alert('Images Uploaded', 'Images uploaded successfully.');
    } catch (error) {
      Alert.alert('Image Upload', 'An error occurred while uploading the images.');
      console.error(error);
    }
  };

  const uploadImageToFirestore = async (uri, type) => {
    try {
      const imageRef = firestore.collection('comparisonImages').doc();
      await imageRef.set({
        uri,
        type,
        uploadedAt: new Date(),
      });
      return imageRef.id;
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Before and After Pictures</Text>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Button title="Upload Before Picture" onPress={() => pickImage('before')} />
          {beforeImage && <Image source={{ uri: beforeImage }} style={styles.image} />}
        </View>
        <View style={styles.imageWrapper}>
          <Button title="Upload After Picture" onPress={() => pickImage('after')} />
          {afterImage && <Image source={{ uri: afterImage }} style={styles.image} />}
        </View>
      </View>
      <Button title="Upload Images" onPress={uploadImagesToFirestore} />
      <ScrollView horizontal>
        <View style={styles.comparisonImagesContainer}>
          {comparisonImages.map((images, index) => (
            <View key={index} style={styles.comparisonImagesWrapper}>
              <Image source={{ uri: images.before }} style={styles.comparisonImage} />
              <Image source={{ uri: images.after }} style={styles.comparisonImage} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  comparisonImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  comparisonImagesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  comparisonImage: {
    width: 150,
    height: 150,
    margin: 5,
  },
});
