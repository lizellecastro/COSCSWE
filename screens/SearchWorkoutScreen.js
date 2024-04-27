import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { debounce } from 'lodash';

export default function SearchWorkoutScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(debounce(async () => {
    if (searchTerm.trim() === '') {
      Alert.alert('Input Required', 'Please enter a search term.');
      return;
    }

    setLoading(true);
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Convert search term to lowercase
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
      if (workoutsList.length === 0) {
        Alert.alert('No Results', 'No workouts found matching your criteria.');
      }
    } catch (error) {
      Alert.alert('Search Error', `Error searching workouts: ${error.message}`);
    }
    setLoading(false);
  }, 300), [searchTerm]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Search workouts..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} disabled={loading} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.workoutContainer}>
              <Text style={styles.workoutName}>{item.w_name}</Text>
              <Text style={styles.workoutDetails}>Description: {item.description}</Text>
              <Text style={styles.workoutDetails}>Difficulty: {item.difficulty}</Text>
              <Text style={styles.workoutDetails}>Sets: {item.sets}</Text>
              <Text style={styles.workoutDetails}>Reps: {item.reps}</Text>
              <Text style={styles.workoutDetails}>Weight: {item.weight_lbs} lbs</Text>
            </View>
          )}
          
          ListEmptyComponent={<Text>No workouts found.</Text>}
        />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  workoutContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#666'
  }
});
