import React, { useState } from 'react';
import { View, Text, TextInput, Button, Flatlist } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firebase';

export default function SearchWorkoutScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleSearch = () => {
    firebase.firestore()
      .collection('workouts')
      .where('name', '>=', searchTerm)
      .get()
      .then(querySnapshot => {
        const workoutsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWorkouts(workoutsList);
      })
      .catch(error => {
        console.error('Error searching workouts: ', error);
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Search Workout</Text>
      <TextInput
        placeholder="Search workouts..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={workouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
