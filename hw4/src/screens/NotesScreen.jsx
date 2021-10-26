import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, Button, SafeAreaViewComponent, Text } from 'react-native';
import NotePreview from "./components/NotePreview.jsx";

import { connect } from 'react-redux';
import { loadNotes, storeNotes } from '../redux/actions.js';

const NotesScreen = ({ loadNotes, storeNotes, notesStore, navigation }) => {

  // On app launch, load notes saved earlier.
  useEffect(() => {
    loadNotes();
    // console.log("Loaded");
  }, []);

  useEffect(() => {
    storeNotes(notesStore.notes);
    // console.log("Stored");
  }, [notesStore]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Create Note")} title="Add" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {notesStore.notes.length !== 0 ?
        <FlatList
          contentContainerStyle={styles.list}
          data={notesStore.notes}
          renderItem={({ item }) => <NotePreview note={item} navigation={navigation} />} // Хорошая ли практика явно передавать navigation как атрибут?
          keyExtractor={item => item.id.toString()}
        />
        : <Text style={styles.hintText}>Add a new note by clicking "Add" button!</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  hintText: {
    marginTop: 10,
    display: "flex",
    alignSelf: "center",
    fontSize: 18
  }
});

const mapStateToProps = state => {
  return {
    notesStore: state.notes,
  }
};

const mapDispatchToProps = {
  loadNotes,
  storeNotes,
};


export default connect(mapStateToProps, mapDispatchToProps)(NotesScreen);
