import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, signOut } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const backgroundImage = require('../assets/test.jpg');

const ProfileInfoCard = ({ email, name, age, fitnessLevel, goals }) => {
  return (
    <View style={styles.profileInfoCard}>
      <View style={styles.profileInfoTitle}>
        <Text style={styles.profileInfoTitleText}>User's Profile:</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Email:</Text>
        <Text style={styles.profileInfoValue}>{email}</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Name:</Text>
        <Text style={styles.profileInfoValue}>{name}</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Age:</Text>
        <Text style={styles.profileInfoValue}>{age}</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Fitness Level:</Text>
        <Text style={styles.profileInfoValue}>{fitnessLevel}</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Goals:</Text>
        <Text style={styles.profileInfoValue}>{goals}</Text>
      </View>
    </View>
  );
};

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
        <View style={styles.header}>
          <Text style={styles.appName}>
            Welcome to Active Path🔥 
            {profile && <Text style={styles.userName}>, {profile.name}. </Text>}
          </Text> 
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <ProfileInfoCard
              email={auth.currentUser?.email}
              name={profile?.name}
              age={profile?.age}
              fitnessLevel={profile?.fitnessLevel}
              goals={profile?.goals}
            />
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
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  profileContainer: {
    marginRight: 20,
  },
  profileInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
  },
  profileInfoTitle: {
    marginBottom: 10,
  },
  profileInfoTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  profileInfoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  profileInfoValue: {},
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 30, // Modified border radius
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: '#f44336',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 30, // Modified border radius
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
