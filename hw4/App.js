import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import NoteScreen from './src/screens/NoteScreen';
import NotesScreen from './src/screens/NotesScreen';

import { Provider } from 'react-redux';

import { store, saga } from './src/redux/store';
import { sagaWatcher } from './src/redux/sagas';

const Stack = createNativeStackNavigator();

saga.run(sagaWatcher);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Notes" component={NotesScreen} />
          <Stack.Screen name="Create Note" component={CreateNoteScreen} />
          <Stack.Screen name="Note" component={NoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
