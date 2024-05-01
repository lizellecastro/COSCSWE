import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { debounce } from 'lodash';

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

  return (
    <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
      <View style={styles.container}>
        <Text style={styles.title}>Search Workout</Text>
        <TextInput
          style={styles.input}
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
                <View key={workout.id} style={styles.workoutContainer}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  workoutContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});
