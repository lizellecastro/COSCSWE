import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
//import { Input, Card, Spin, Empty } from 'antd';   <----- This strictly only works for web apps, not mobile
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { debounce } from 'lodash';

//const { Search } = Input; <----- caused issues on my (Lizelle) end as a mobile app

export default function SearchWorkoutScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(debounce(async (value) => {
    if (value.trim() === '') {
      // Handle empty search term
      return;
    }

    setLoading(true);
    const lowerCaseSearchTerm = value.toLowerCase(); // Convert search term to lowercase
    try {
      const q = query(
        collection(db, 'search_workout'),
        where('w_name', '>=', lowerCaseSearchTerm),
        where('w_name', '<=', lowerCaseSearchTerm + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const workoutsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        w_name: doc.data().w_name || "Unnamed Workout",
        description: doc.data().description || "No description available",
        difficulty: doc.data().difficulty || "Not specified",
        sets: doc.data().sets || 0,
        reps: doc.data().reps || 0,
        weight_lbs: doc.data().weight_lbs || 0
      }));
      
      console.log(`Found ${workoutsList.length} workouts`); // Debugging output

      setWorkouts(workoutsList);
    } catch (error) {
      console.error('Search Error:', error.message);
    }
    setLoading(false);
  }, 300), []);

  // Under return, earlier this was not in the React Native format which made mobile app not work, so I changed it  

  return (
    <View style={{ padding: 20, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Search Workout</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Search workouts..."
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
      />
      <Button onPress={() => handleSearch(searchTerm)} title="Search" disabled={loading} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        workouts.length === 0 ? (
          <Text>No workouts found.</Text>
        ) : (
          <ScrollView>
            {workouts.map(workout => (
              <View key={workout.id} style={{ padding: 10, marginTop: 10, backgroundColor: '#ddd', borderRadius: 5 }}>
                <Text>{workout.w_name}</Text>
                <Text>Description: {workout.description}</Text>
                <Text>Difficulty: {workout.difficulty}</Text>
                <Text>Sets: {workout.sets}</Text>
                <Text>Reps: {workout.reps}</Text>
                <Text>Weight: {workout.weight_lbs} lbs</Text>
              </View>
            ))}
          </ScrollView>
        )
      )}
    </View>
  );
}
