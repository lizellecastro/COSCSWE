import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const backgroundImage = require('../assets/test.jpg');

const GoalMonitoringScreen = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    const fetchUserProfiles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'user_profiles'));
            const profiles = querySnapshot.docs.map(doc => doc.data());
            setUserProfiles(profiles);
        } catch (error) {
            console.error("Error fetching user profiles:", error);
            Alert.alert("Error", "Failed to fetch user profiles. Please try again.");
        }
    };

    const handleUserNamePress = (userName) => {
        const user = userProfiles.find(profile => profile.name === userName);
        if (user) {
            if (user.goal) {
                Alert.alert('User Goal', `User ${userName}'s goal: ${user.goal}`);
            } else {
                Alert.alert('User Goal', `User ${userName} has not set a goal yet.`);
            }
        }
    };

    return (
        <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Goal Monitoring</Text>
                {userProfiles.map((profile, index) => (
                    <TouchableOpacity key={index} onPress={() => handleUserNamePress(profile.name)}>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>{profile.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    userNameContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        color: '#000',
    },
});

export default GoalMonitoringScreen;
