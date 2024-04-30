import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth, signOut } from '../firebase';


const AdminHomeScreen = ({ navigation }) => {
    const handleSignOut = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigation.replace('Login');
      }).catch((error) => {
        // An error happened.
        console.error('Sign out error:', error);
      });
    };
  
    return (
      <View style={styles.container}>
        <Text>Admin Home Screen</Text>
        <Button title="Manage Workouts" onPress={() => navigation.navigate('ManageWorkouts')} />
        <Button title="View and Edit Profiles" onPress={() => navigation.navigate('ViewEditProfile')} />
        <Button title="Goal Monitoring" onPress={() => navigation.navigate('GoalMonitoring')} />
        <Button title="Real-Time Data" onPress={() => navigation.navigate('RealTimeData')} />
        <Button title="Log Out" onPress={handleSignOut} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  
  export default AdminHomeScreen;
  