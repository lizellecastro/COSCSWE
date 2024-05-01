import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';

const backgroundImage = require('../assets/test.jpg');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Registered with:', userCredential.user.email);
      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Logged in with:', userCredential.user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.overlay}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.appName}> Active Path🔥</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Adjust the width of the container
    padding: 20, // Adjust the padding of the container
    borderRadius: 10, // Adjust the border radius of the container
  },
  welcome: {
    fontSize: 36, // Adjust the font size as needed
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  appName: {
    fontSize: 36, // Adjust the font size as needed
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%', // Adjust the width of the input container
    marginBottom: 20, // Adjust the margin bottom of the input container
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%', // Adjust the width of the button container
    alignItems: 'center', // Center align the buttons
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10, // Adjust the margin bottom of the button
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  }
});
