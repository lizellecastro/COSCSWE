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
  