import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const ManageWorkoutsScreen = () => {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    const workoutCollectionRef = collection(db, "search_workout");
    const querySnapshot = await getDocs(workoutCollectionRef);
    const fetchedWorkouts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setWorkouts(fetchedWorkouts);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleUpdateWorkout = async (id, updatedWorkout) => {
    const workoutRef = doc(db, "search_workout", id);
    try {
      await updateDoc(workoutRef, updatedWorkout);
      alert("Workout updated successfully!");
      fetchWorkouts();  // Refresh the list after update
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update workout.");
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteDoc(doc(db, "search_workout", id));
      alert("Workout deleted successfully!");
      setWorkouts(workouts.filter(workout => workout.id !== id)); // Remove the workout from local state
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete workout.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Plans</Text>
      <ScrollView style={styles.scrollView}>
        {workouts.map((workout) => (
          <View key={workout.id} style={styles.workoutItem}>
            <Text style={styles.label}>Workout Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setWorkouts(workouts.map(w => w.id === workout.id ? { ...w, w_name: text } : w))}
              value={workout.w_name}
              placeholder="Name"
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setWorkouts(workouts.map(w => w.id === workout.id ? { ...w, description: text } : w))}
              value={workout.description}
              placeholder="Description"
            />
            <Text style={styles.label}>Difficulty:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setWorkouts(workouts.map(w => w.id === workout.id ? { ...w, difficulty: text } : w))}
              value={workout.difficulty}
              placeholder="Difficulty"
            />
            <Text style={styles.label}>Reps:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setWorkouts(workouts.map(w => w.id === workout.id ? { ...w, reps: text } : w))}
              value={`${workout.reps}`}
              placeholder="Reps"
              keyboardType="numeric"
            />
            <Text style={styles.label}>Sets:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setWorkouts(workouts.map(w => w.id === workout.id ? { ...w, sets: text } : w))}
              value={`${workout.sets}`}
              placeholder="Sets"
              keyboardType="numeric"
            />
            <Text style={styles.label}>Weight in lbs:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setWorkouts(workouts.map(w => w.id === workout.id ? { ...w, weight_lbs: text } : w))}
              value={`${workout.weight_lbs}`}
              placeholder="Weight in lbs"
              keyboardType="numeric"
            />
            <Button
              title="Save Changes"
              onPress={() => handleUpdateWorkout(workout.id, {
                w_name: workout.w_name,
                description: workout.description,
                difficulty: workout.difficulty,
                reps: parseInt(workout.reps),
                sets: parseInt(workout.sets),
                weight_lbs: parseInt(workout.weight_lbs)
              })}
            />
            <Button
              title="Delete Workout"
              color="#ff6347"  // Tomato color for delete button
              onPress={() => handleDeleteWorkout(workout.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  scrollView: {
    width: '100%'
  },
  workoutItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  }
});

export default ManageWorkoutsScreen;

