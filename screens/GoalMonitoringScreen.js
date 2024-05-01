import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground, Modal, Pressable, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const backgroundImage = require('../assets/test.jpg');

const GoalMonitoringScreen = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [reminderModalVisible, setReminderModalVisible] = useState(false);

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    const fetchUserProfiles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'user_profiles'));
            const profiles = querySnapshot.docs.map(doc => doc.data());

            // Add mock goals to user profiles
            const profilesWithGoals = profiles.map(profile => {
                // Mock goals for each user
                if (profile.name === 'Usha') {
                    profile.goal = 'Gain Muscle';
                    profile.timeframe = '21 Days';
                } else if (profile.name === 'Himani') {
                    profile.goal = 'Lose Weight';
                    profile.timeframe = '30 Days';
                } else if (profile.name === 'Lizelle') {
                    profile.goal = 'Improve Flexibility';
                    profile.timeframe = '14 Days';
                }
                return profile;
            });

            setUserProfiles(profilesWithGoals);
        } catch (error) {
            console.error("Error fetching user profiles:", error);
            Alert.alert("Error", "Failed to fetch user profiles. Please try again.");
        }
    };

    const handleUserNamePress = (userName) => {
        const user = userProfiles.find(profile => profile.name === userName);
        if (user) {
            setSelectedUser(user);
        }
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleSendReminder = () => {
        // Add logic to send reminders to users
        setReminderModalVisible(true);
    };

    return (
        <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Goal Monitoring</Text>
                <Button title="Send Reminder" onPress={handleSendReminder} />
                {userProfiles.map((profile, index) => (
                    <TouchableOpacity key={index} onPress={() => handleUserNamePress(profile.name)}>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>{profile.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={selectedUser !== null}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedUser?.name}'s Goal</Text>
                            <Text>{`Goal: ${selectedUser?.goal}`}</Text>
                            <Text>{`Timeframe: ${selectedUser?.timeframe}`}</Text>
                            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={reminderModalVisible}
                    onRequestClose={() => setReminderModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Send Reminder</Text>
                            <Text>Reminder sent to all users to workout!</Text>
                            <Pressable style={styles.closeButton} onPress={() => setReminderModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GoalMonitoringScreen;
