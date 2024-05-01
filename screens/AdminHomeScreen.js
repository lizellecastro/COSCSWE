import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { auth, signOut } from '../firebase';

const backgroundImage = require('../assets/test.jpg'); // Adjust the path accordingly

const AdminHomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace('Login');
      })
      .catch((error) => {
        // An error happened.
        console.error('Sign out error:', error);
      });
  };

  return (
    <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
      <View style={styles.container}>
        <Text style={styles.title}>Admin Home Screen</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageWorkouts')}>
          <Text style={styles.buttonText}>Manage Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewEditProfile')}>
          <Text style={styles.buttonText}>View and Edit Profiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GoalMonitoring')}>
          <Text style={styles.buttonText}>Goal Monitoring</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RealTimeData')}>
          <Text style={styles.buttonText}>Real-Time Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width:'100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add some opacity to the background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdminHomeScreen;
