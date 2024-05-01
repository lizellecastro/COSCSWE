import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TextInput, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const backgroundImage = require('../assets/test.jpg'); // Adjust the path accordingly

const ViewEditProfileScreen = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editableProfile, setEditableProfile] = useState({
        name: '',
        age: '',
        fitnessLevel: '',
        goals: ''
    });

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    const fetchUserProfiles = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'user_profiles'));
            const profilesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const sortedProfiles = profilesList.sort((a, b) => a.name.localeCompare(b.name));
            setUserProfiles(sortedProfiles);
        } catch (error) {
            console.error("Failed to fetch user profiles:", error);
            Alert.alert("Fetch Error", "Failed to fetch user profiles. Check your permissions or network.");
        }
        setLoading(false);
    };

    const handleSelectProfile = (profile) => {
        setSelectedUserId(profile.id);
        setEditableProfile({ ...profile });
    };

    const handleSaveChanges = async () => {
        if (editableProfile.id) {
            const profileRef = doc(db, 'user_profiles', editableProfile.id);
            try {
                await updateDoc(profileRef, editableProfile);
                Alert.alert('Success', 'Profile updated successfully');
                fetchUserProfiles();  // Refresh the list after updating
            } catch (error) {
                console.error('Update Error:', error);
                Alert.alert('Update Error', 'Failed to update profile');
            }
        }
    };

    return (
        <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="repeat">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Active Path</Text>
                    <Text style={styles.fireSymbol}>🔥</Text>
                </View>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={userProfiles}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.profileItem}>
                                <TouchableOpacity onPress={() => handleSelectProfile(item)} style={styles.userNameButton}>
                                    <Text style={styles.userNameText}>{item.name}</Text>
                                </TouchableOpacity>
                                {selectedUserId === item.id && (
                                    <View style={styles.editContainer}>
                                        <Text style={styles.label}>Name:</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={editableProfile.name}
                                            onChangeText={text => setEditableProfile(prev => ({ ...prev, name: text }))}
                                            placeholder="Name"
                                            placeholderTextColor="#ffffff"
                                        />
                                        <Text style={styles.label}>Age:</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={editableProfile.age}
                                            onChangeText={text => setEditableProfile(prev => ({ ...prev, age: text }))}
                                            placeholder="Age"
                                            keyboardType="numeric"
                                            placeholderTextColor="#ffffff"
                                        />
                                        <Text style={styles.label}>Fitness Level:</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={editableProfile.fitnessLevel}
                                            onChangeText={text => setEditableProfile(prev => ({ ...prev, fitnessLevel: text }))}
                                            placeholder="Fitness Level"
                                            placeholderTextColor="#ffffff"
                                        />
                                        <Text style={styles.label}>Fitness Goal:</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={editableProfile.goals}
                                            onChangeText={text => setEditableProfile(prev => ({ ...prev, goals: text }))}
                                            placeholder="Goals"
                                            multiline
                                            placeholderTextColor="#ffffff"
                                        />
                                        <Button title="Save Changes" onPress={handleSaveChanges} color="#000000" />
                                    </View>
                                )}
                            </View>
                        )}
                        contentContainerStyle={styles.centeredProfileList}
                    />
                )}
            </View>
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
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add some opacity to the background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginRight: 5,
    },
    fireSymbol: {
        fontSize: 24,
        color: '#ff5722',
    },
    loadingText: {
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
    },
    profileItem: {
        marginBottom: 20,
    },
    editContainer: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    input: {
        height: 40,
        borderColor: '#ffffff',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#ffffff',
    },
    userNameButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    userNameText: {
        color: '#000000', // Black color
        fontSize: 16,
    },
    centeredProfileList: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    label: {
        color: '#ffffff',
        marginBottom: 5,
    },
});

export default ViewEditProfileScreen;
