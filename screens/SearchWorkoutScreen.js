import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function SearchWorkoutScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleSearch = async () => {
    try {
      const q = query(collection(db, 'workouts'), where('name', '>=', searchTerm));
      const querySnapshot = await getDocs(q);
      const workoutsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkouts(workoutsList);
    } catch (error) {
      Alert.alert('Search Workout', 'Error searching workouts: ' + error.message);
    }
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
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginTop: 10, backgroundColor: '#ddd' }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
