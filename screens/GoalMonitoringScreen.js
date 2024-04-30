import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalMonitoringScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Goal Monitoring</Text>
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

export default GoalMonitoringScreen;
