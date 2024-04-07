import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification'; //For the push notification
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import SearchWorkoutScreen from './screens/SearchWorkoutScreen';
import ExerciseGoalsScreen from './screens/ExerciseGoalsScreen';
import BeforeAfterPicturesScreen from './screens/BeforeAfterPicturesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Initialize push notification library
    PushNotification.configure({
      // Configuration options
    });

    // Cleanup function
    return () => {
      // Clean up any subscriptions or resources
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="SearchWorkout" component={SearchWorkoutScreen} />
        <Stack.Screen name="ExerciseGoals" component={ExerciseGoalsScreen} />
        <Stack.Screen name="BeforeAfterPictures" component={BeforeAfterPicturesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
