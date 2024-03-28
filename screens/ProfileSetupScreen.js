import React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

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

  const handleSubmit = () => {
    const { name, age, fitnessLevel, goals } = profile;
    const goalsArray = goals.split(',').map(goal => goal.trim()); // Assuming goals are comma-separated
    const userId = firebase.auth().currentUser.uid;

    firebase.firestore()
      .collection('user_profiles')
      .doc(userId)
      .set({
        name,
        age,
        fitnessLevel,
        goals: goalsArray
      })
      .then(() => {
        Alert.alert('Profile Setup', 'Profile setup successful');
      })
      .catch(error => {
        Alert.alert('Profile Setup', 'Error setting up profile: ' + error.message);
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' padding: 20 }}>
      <Text>Profile Setup</Text>
      <TextInput
        placeholder="Name"
        value={profile.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <TextInput
        placeholder="Age"
        value={profile.age}
        onChangeText={text => handleInputChange('age', text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Fitness Level"
        value={profile.fitnessLevel}
        onChangeText={text => handleInputChange('fitnessLevel', text)}
      />
      <TextInput
        placeholder="Goals (comma-separated)"
        value={profile.goals}
        onChangeText={text => handleInputChange('goals', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
