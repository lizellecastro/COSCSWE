import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const backgroundImage = require('../assets/test.jpg');

export default function ProfileSetupScreen() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    fitnessLevel: '',
    goals: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [setupSuccess, setSetupSuccess] = useState(false); // State to track setup success

  const handleInputChange = (name, value) => {
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      setSubmitting(true);
      const { name, age, fitnessLevel, goals } = profile;
      
      // Simple form validation
      if (!name.trim() || !age.trim() || !fitnessLevel.trim() || !goals.trim()) {
        setErrors({ message: 'All fields are required.' });
        setSubmitting(false);
        return;
      }

      const goalsArray = goals.split(',').map((goal) => goal.trim()); // Assuming goals are comma-separated
      const userId = auth.currentUser.uid;

      await setDoc(doc(db, 'user_profiles', userId), {
        name,
        age,
        fitnessLevel,
        goals: goalsArray,
      });

      // Update state to indicate success
      setSetupSuccess(true);
    } catch (error) {
      Alert.alert('Profile Setup', 'Error setting up profile: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to reset success message after some time
  const resetSuccessMessage = () => {
    setSetupSuccess(false);
  };
    
  return (
    <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Active Path</Text>
        <Text style={styles.subtitle}>Setup Your Profile</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={profile.name}
            onChangeText={text => handleInputChange('name', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            value={profile.age}
            onChangeText={text => handleInputChange('age', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your fitness level"
            value={profile.fitnessLevel}
            onChangeText={text => handleInputChange('fitnessLevel', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your fitness goals (comma-separated)"
            value={profile.goals}
            onChangeText={text => handleInputChange('goals', text)}
          />
        </View>
        {errors.message && <Text style={styles.error}>{errors.message}</Text>}
        <Button
          title={submitting ? "Submitting..." : "Submit"}
          onPress={handleSubmit}
          disabled={submitting}
        />
        {setupSuccess && (
          <Text style={styles.successMessage}>
            Profile setup successful!
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background
  },
  backgroundImage: {
    flex: 1,
    width:'100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // White color for text
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff', // White color for text
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Add opacity to the background
    borderRadius: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: '#fff', // White color for text
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
});
