import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

export default function SearchWorkoutScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Create a query to search for workouts by name
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
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Search workouts..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.workoutContainer}>
              <Text style={styles.workoutName}>{item.name}</Text>
              {/* You can display more workout details here */}
            </View>
          )}
          ListEmptyComponent={<Text>No workouts found</Text>}
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
});
