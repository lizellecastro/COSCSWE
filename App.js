import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import SearchWorkoutScreen from './screens/SearchWorkoutScreen';
import ExerciseGoalsScreen from './screens/ExerciseGoalsScreen';
import BeforeAfterPicturesScreen from './screens/BeforeAfterPicturesScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import ManageWorkoutScreen from './screens/ManageWorkoutScreen';
import ViewEditProfileScreen from './screens/ViewEditProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="SearchWorkout" component={SearchWorkoutScreen} />
        <Stack.Screen name="ExerciseGoals" component={ExerciseGoalsScreen} />
        <Stack.Screen name="BeforeAfterPictures" component={BeforeAfterPicturesScreen} />
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        <Stack.Screen name="ManageWorkouts" component={ManageWorkoutScreen} />
        <Stack.Screen name="ViewEditProfile" component={ViewEditProfileScreen} />
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
