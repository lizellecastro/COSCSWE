import React, { useState, useCallback } from 'react';
import { Button, Input, Card, Spin, Empty } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { debounce } from 'lodash';

const { Search } = Input;

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
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Search Workout</h1>
      <Search
        placeholder="Search workouts..."
        onSearch={handleSearch}
        enterButton={<Button type="primary">Search</Button>}
        loading={loading}
      />
      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <Spin size="large" />
        ) : workouts.length === 0 ? (
          <Empty description="No workouts found." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            {workouts.map(workout => (
              <Card key={workout.id} title={workout.w_name} style={{ width: '100%' }}>
                <p>Description: {workout.description}</p>
                <p>Difficulty: {workout.difficulty}</p>
                <p>Sets: {workout.sets}</p>
                <p>Reps: {workout.reps}</p>
                <p>Weight: {workout.weight_lbs} lbs</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
