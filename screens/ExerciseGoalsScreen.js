import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
//import PushNotification from 'react-native-push-notifications'; I have made this library a comment for now because I need to setup the push notification. 


export default function ExerciseGoalsScreen() {
  const [goal, setGoal] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [progress, setProgress] = useState(0);
  const [reminder, setReminder] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [newTimeframe, setNewTimeframe] = useState('');

  const handleGoalSetting = () => {
    // Simulated logic for goal setting
    if (goal && timeframe) {
      console.log('Goal set:', goal, 'in', timeframe);
      // Set initial progress to 0%
      setProgress(0);
    } else {
      console.log('Please fill in both goal and timeframe');
    }
  };

  const handleGoalAdjustment = () => {
    setIsModalVisible(true);
  };

  const handleConfirmGoalAdjustment = () => {
    // Simulated logic for goal adjustment
    console.log('Goal adjusted');
    if (newGoal && newTimeframe) {
      setGoal(newGoal);
      setTimeframe(newTimeframe);
      setIsModalVisible(false);
      // Recalculate progress based on the adjusted goal
      // This is just a placeholder, you may implement your own logic here
      setProgress(Math.floor(Math.random() * 100)); // Random progress between 0 to 100%
    } else {
      console.log('Please fill in both new goal and new timeframe');
    }
  };

  const handleProgressUpdate = () => {
    // Simulated logic for progress update
    if (progress < 100) {
      const newProgress = progress + 10; // Increment progress by 10%
      setProgress(Math.min(newProgress, 100)); // Ensure progress does not exceed 100%
      console.log('Progress updated to:', progress);
    } else {
      console.log('Goal already achieved!');
    }
  };

  const handleReminderSet = () => {
    // Schedule a push notification for the reminder time
    PushNotification.localNotificationSchedule({
      message: "Don't forget your workout!",
      date: new Date(reminder), // Reminder time
    });
    console.log('Reminder set for:', reminder);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Your Exercise Goals</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Goal:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setGoal}
          value={goal}
          placeholder="e.g., Lose weight, Gain muscle, etc."
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Timeframe:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTimeframe}
          value={timeframe}
          placeholder="e.g., 1 month, 3 months, etc."
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGoalSetting}>
        <Text style={styles.buttonText}>Set Goal</Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Progress:</Text>
        <Text style={styles.progressValue}>{progress}%</Text>
      </View>

      <Button title="Adjust Goal" onPress={handleGoalAdjustment} />

      <Button title="Update Progress" onPress={handleProgressUpdate} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Set Reminder:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setReminder}
          value={reminder}
          placeholder="Enter reminder time"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReminderSet}>
        <Text style={styles.buttonText}>Set Reminder</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adjust Goal</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Goal:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewGoal}
                value={newGoal}
                placeholder="e.g., Lose weight, Gain muscle, etc."
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Timeframe:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewTimeframe}
                value={newTimeframe}
                placeholder="e.g., 1 month, 3 months, etc."
              />
            </View>
            <Button title="Confirm" onPress={handleConfirmGoalAdjustment} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
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
