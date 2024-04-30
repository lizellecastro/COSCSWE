import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

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
            setUserProfiles(profilesList);
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
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={userProfiles}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Button
                                title={item.name} // Only display the name
                                onPress={() => handleSelectProfile(item)}
                            />
                            {selectedUserId === item.id && (
                                <View style={styles.editContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={editableProfile.name}
                                        onChangeText={text => setEditableProfile(prev => ({ ...prev, name: text }))}
                                        placeholder="Name"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        value={editableProfile.age}
                                        onChangeText={text => setEditableProfile(prev => ({ ...prev, age: text }))}
                                        placeholder="Age"
                                        keyboardType="numeric"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        value={editableProfile.fitnessLevel}
                                        onChangeText={text => setEditableProfile(prev => ({ ...prev, fitnessLevel: text }))}
                                        placeholder="Fitness Level"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        value={editableProfile.goals}
                                        onChangeText={text => setEditableProfile(prev => ({ ...prev, goals: text }))}
                                        placeholder="Goals"
                                        multiline
                                    />
                                    <Button title="Save Changes" onPress={handleSaveChanges} />
                                </View>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    editContainer: {
        padding: 10,
        backgroundColor: '#ddd'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%'  // Ensure full width to maintain layout consistency
    }
});

export default ViewEditProfileScreen;



