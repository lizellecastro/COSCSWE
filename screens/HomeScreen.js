import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, signOut } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = auth.currentUser.uid;
        const profileDoc = await getDoc(doc(db, 'user_profiles', userId));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        } else {
          setProfile(null); // Profile doesn't exist
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.userInfo}>
          {profile ? (
            <>
              <Text style={styles.userEmail}>Email: {auth.currentUser?.email}</Text>
              <Text style={styles.userProfileInfo}>Name: {profile.name}</Text>
              <Text style={styles.userProfileInfo}>Age: {profile.age}</Text>
              <Text style={styles.userProfileInfo}>Fitness Level: {profile.fitnessLevel}</Text>
              <Text style={styles.userProfileInfo}>Goals: {profile.goals}</Text>
            </>
          ) : (
            <Text>No profile information available</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileSetup')} style={styles.button}>
            <Text style={styles.buttonText}>Setup Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SearchWorkout')} style={styles.button}>
            <Text style={styles.buttonText}>Search Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ExerciseGoals')} style={styles.button}>
            <Text style={styles.buttonText}>Exercise Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BeforeAfterPictures')} style={styles.button}>
            <Text style={styles.buttonText}>Progress Pictures</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width:'100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  userInfo: {
    marginBottom: 20,
  },
  userEmail: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userProfileInfo: {
    color: '#000',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: '#f44336',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
