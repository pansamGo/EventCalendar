

import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Calendar, Agenda} from 'react-native-calendars';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {

  const [showModal, setModalState] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveEvent = async () => {
    let newEvent = {title: eventTitle, desc: description, date: selectedDay};
    await AsyncStorage.setItem('event', JSON.stringify(newEvent));
    setModalState(false);
  }

  const deleteEvent = async () => {}

  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={showModal}>
        <View style={{ flex: 1 }}>
          <Text>Title</Text>
          <TextInput
            style={styles.textInput}
            value={eventTitle}
            onChangeText={(value) => setEventTitle(value)}
           />
           <Text>Description</Text>
          <TextInput
            style={styles.textInput}
            value={description}
            onChangeText={(value) => setDescription(value)}
           />
           <Text>Date</Text>
          <TextInput
            editable={false}
            style={styles.textInput}
            value={selectedDay}
           />
           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.saveBtn} onPress={saveEvent}>
              <Text style={{color: '#fff'}}>Save Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={deleteEvent}>
              <Text style={{color: '#fff'}}>Delete Event</Text>
            </TouchableOpacity>
           </View>
        </View>
      </Modal>
      <Calendar
        style={{
          borderWidth: 1,
          height: 400
        }}
        onDayPress={(day) => {
          setSelectedDay(day.dateString);
          setModalState(true);
        }}
        
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    width: 'auto', height: 50, borderWidth: 1, borderColor: '#fff', marginVertical: 10
  },
  saveBtn: {
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center', 
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default App;
