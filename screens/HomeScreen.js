import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Make sure to import from '@react-navigation/native'
import React from 'react';
import { auth, signOut } from '../firebase';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    }).catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProfileSetup')} 
        style={styles.buttonProfile}
      >
        <Text style={styles.buttonText}>Setup Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('SearchWorkout')} 
        style={styles.buttonProfile}
      >
        <Text style={styles.buttonText}>Search Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('ExerciseGoals')} 
        style={styles.buttonProfile}
      >
        <Text style={styles.buttonText}>Exercise Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('BeforeAfterPictures')} 
        style={styles.buttonProfile}
      >
        <Text style={styles.buttonText}>Progress Pictures</Text>
      </TouchableOpacity>

      {/* Adding some space between the buttons */}
      <View style={{ marginBottom: 20 }} />

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60, // Adjust as needed to create space from the top
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonProfile: {
    backgroundColor: '#9C27B0', // Purple color
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40, // Adjust or remove as per your layout needs
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
