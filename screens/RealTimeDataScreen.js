import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, Button } from 'react-native';

const RealTimeDataScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Mock data for users
    const users = [
        { name: 'Usha', activityTime: '2 hours', accountCreation: '2023-05-15', feedback: 'Great app! Really helped me stay on track with my fitness goals.' },
        { name: 'Himani', activityTime: '1.5 hours', accountCreation: '2023-06-10', feedback: 'Enjoying the app. Some features could be improved though.' },
        { name: 'Lizelle', activityTime: '3 hours', accountCreation: '2023-07-20', feedback: 'App is user-friendly. Would love to see more workout options.' },
    ];

    // Function to handle user selection
    const handleUserSelection = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    return (
        <ImageBackground source={require('../assets/test.jpg')} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.container}>
                <Text style={styles.heading}>Real-Time Data</Text>
                <View style={styles.userListContainer}>
                    <Text style={styles.sectionHeading}>Users:</Text>
                    {users.map((user, index) => (
                        <TouchableOpacity key={index} onPress={() => handleUserSelection(user)}>
                            <View style={styles.userItem}>
                                <Text style={styles.userName}>{user.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedUser?.name}</Text>
                            <Text>Activity Time: {selectedUser?.activityTime}</Text>
                            <Text>Account Creation: {selectedUser?.accountCreation}</Text>
                            <Text>Feedback: {selectedUser?.feedback}</Text>
                            <Button title="Close" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userListContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
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
});

export default RealTimeDataScreen;
