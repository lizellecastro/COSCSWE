import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function ProfileSetupScreen() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    fitnessLevel: '',
    goals: ''
  });

  const handleInputChange = (name, value) => {
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const { name, age, fitnessLevel, goals } = profile;
      const goalsArray = goals.split(',').map((goal) => goal.trim()); // Assuming goals are comma-separated
      const userId = auth.currentUser.uid;

      await setDoc(doc(db, 'user_profiles', userId), {
        name,
        age,
        fitnessLevel,
        goals: goalsArray,
      });

      Alert.alert('Setup Profile', 'Profile setup successful');
    } catch (error) {
      Alert.alert('Setup Profile', 'Error setting up profile: ' + error.message);
    }
  };
    
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Setup Profile</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Name"
        value={profile.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Age"
        value={profile.age}
        onChangeText={text => handleInputChange('age', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Fitness Level"
        value={profile.fitnessLevel}
        onChangeText={text => handleInputChange('fitnessLevel', text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Goals (comma-separated)"
        value={profile.goals}
        onChangeText={text => handleInputChange('goals', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
