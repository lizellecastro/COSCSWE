import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

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
    <View style={styles.container}>
      <Text style={styles.title}>Setup Profile</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={profile.name}
          onChangeText={text => handleInputChange('name', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          value={profile.age}
          onChangeText={text => handleInputChange('age', text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fitness Level</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your fitness level"
          value={profile.fitnessLevel}
          onChangeText={text => handleInputChange('fitnessLevel', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Goals (comma-separated)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your fitness goals"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 5,
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
