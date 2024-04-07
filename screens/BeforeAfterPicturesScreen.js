import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default function BeforeAfterPicturesScreen() {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [comparisonImages, setComparisonImages] = useState([]);

  const pickImage = async (type) => {
    console.log(`Picking image for: ${type}`); // Debug log
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result); // Log the result to see what's returned

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log(`Selected image URI: ${uri}`); // Confirm URI is present
      if (type === 'before') {
        setBeforeImage(uri);
      } else if (type === 'after') {
        setAfterImage(uri);
      }
    }
};

  
  console.log('Before Image URI:', beforeImage);
  console.log('After Image URI:', afterImage);

  // This function handles the upload to Firebase Storage and then saves the download URL in Firestore
  const handleUpload = async () => {
    if (!beforeImage || !afterImage) {
      Alert.alert("Image Upload", "Please select both before and after images.");
      return;
    }
    try {
      const beforeImageURL = await uploadImageAndStoreURL(beforeImage, 'before');
      const afterImageURL = await uploadImageAndStoreURL(afterImage, 'after');
      
      setComparisonImages([...comparisonImages, { before: beforeImageURL, after: afterImageURL }]);
      Alert.alert('Success', 'Images uploaded successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload images');
      console.error(error);
    }
  };


  
  // This function uploads the image to Firebase Storage and then saves the URL in Firestore
  const uploadImageAndStoreURL = async (uri, type) => {
    if (!auth.currentUser) {
        console.error("No authenticated user.");
        return; // Or handle this scenario appropriately
    }
    
    const uid = auth.currentUser.uid; // Get the UID of the currently logged-in user

    try {
        const storage = getStorage();
        const imageName = `${type}_${new Date().getTime()}`; // Create a unique image name
        const ref = storageRef(storage, `images/${imageName}`);
        
        // Convert the local file URI to a blob
        const response = await fetch(uri);
        const blob = await response.blob();
        
        // Upload the image to Firebase Storage
        await uploadBytes(ref, blob);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(ref);

        // Save this downloadURL in Firestore with the UID
        const firestoreRef = doc(collection(db, 'comparisonImages'));
        await setDoc(firestoreRef, {
            uri: downloadURL,
            type,
            uploadedAt: new Date(),
            uid, // Include the UID in the document
        });

        return downloadURL; // Return the download URL for display or further use
    } catch (error) {
        console.error("Error uploading image and storing URL:", error);
        throw error; // Rethrow or handle error appropriately
    }
};
  
  // New function to fetch image URLs from Firestore on component mount
  useEffect(() => {
    const fetchImages = async () => {
      if (!auth.currentUser) return; // Ensure there is a logged-in user
      
      const userUid = auth.currentUser.uid;
      const querySnapshot = await getDocs(query(collection(db, 'comparisonImages'), where('uid', '==', userUid)));
      const images = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        images.push({ uri: data.uri, type: data.type });
      });
      
      setComparisonImages(images);
    };
  
    fetchImages();
  }, []);
  

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
      <Button title="Upload Images" onPress={handleUpload} />
      <ScrollView horizontal>
  <View style={styles.comparisonImagesContainer}>
    {comparisonImages.map((image, index) => (
      <View key={index} style={styles.comparisonImagesWrapper}>
        <Image source={{ uri: image.uri }} style={styles.comparisonImage} />
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