import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from "react/cjs/react.development";
import { FlatList, StyleSheet, View, Button, SafeAreaViewComponent } from 'react-native';
import NotePreview from "./components/NotePreview.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@notes_data', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    let jsonValue, collect;
    try {
      jsonValue = await AsyncStorage.getItem('@notes_data');
    } catch (e) {
      // error reading value
    }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }

  // On app launch, load notes saved earlier.
  useEffect(() => {
    // storeData(DATA);
    getData().then((r) => { setNotes(r) });
    console.log("Loaded");
  }, []);

  useEffect(() => {
    storeData(notes);
    console.log("Stored");
  }, [notes]);

  const addNote = (note) => {
    setNotes(notes ? (notes => [...notes, note]) : ([note]));
  };

  const deleteNote = (note) => {
    const newNotes = notes;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i] === note) {
        newNotes.splice(i, 1);
        break;
      }
    }

    setNotes(newNotes => [...newNotes]);
  }

  const editNote = (note) => {
    const noteId = note.id;
    const newNotes = notes;
    let i = 0

    for (i; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        newNotes[i] = note;
        break;
      }
    }

    setNotes([...newNotes]);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Create Note", { handleCreateNote: addNote })} title="Add" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={notes}
        renderItem={({ item }) => <NotePreview note={item} navigation={navigation} deleteNote={deleteNote} editNote={editNote} />} // Хорошая ли практика явно передавать navigation как атрибут?
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
});

export default NotesScreen;
