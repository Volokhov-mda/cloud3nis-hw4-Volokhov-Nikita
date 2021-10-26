import AsyncStorage from '@react-native-async-storage/async-storage';
import types from "./types.js";

export const createNote = note => ({ 
    type: types.CREATE_NOTE, 
    payload: note, 
});

export const editNote = noteToEdit => ({
    type: types.EDIT_NOTE,
    payload: noteToEdit,
});

export const deleteNote = noteToDelete => ({
    type: types.DELETE_NOTE,
    payload: noteToDelete,
});

export const loadNotes = () => {
    return {
        type: types.LOAD_NOTES,
    }

    // return async dispatch => {
    //     let jsonValue;
    //     try {
    //         jsonValue = await AsyncStorage.getItem('@notes_data');
    //     } catch (e) {
    //         // error reading value
    //     }

    //     dispatch({ type: types.LOAD_NOTES, payload: jsonValue != null ? JSON.parse(jsonValue) : [], })
    // };
};

export const storeNotes = (notesToStore) => {
    return {
        type: types.STORE_NOTES,
        payload: notesToStore,
    }

    // return async dispatch => {
    //     try {
    //         const jsonValue = JSON.stringify(notesToStore);
    //         await AsyncStorage.setItem('@notes_data', jsonValue)
    //       } catch (e) {
    //         // saving error
    //     }

    //     let jsonValue;
    //     try {
    //         jsonValue = await AsyncStorage.getItem('@notes_data');
    //     } catch (e) {
    //         // error reading value
    //     }

    //     console.log("stored", notesToStore);

    //     // dispatch({ type: types.STORE_NOTES, payload: notesToStore, });
    // };
};