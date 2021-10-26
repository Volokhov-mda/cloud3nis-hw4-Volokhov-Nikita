import AsyncStorage from '@react-native-async-storage/async-storage';
import { takeEvery, put, call } from "redux-saga/effects";
import { loadNotes } from './actions';
import { store } from './store';

import types from "./types";

export function* sagaWatcher() {
    yield takeEvery(types.LOAD_NOTES, sagaLoad);
    yield takeEvery(types.STORE_NOTES, sagaStore);
};

function* sagaLoad() {
    const payload = yield call(fetchNotes);
    yield put({ type: types.REQUEST_NOTES, payload });
}

function* sagaStore(action) {
    yield call(() => storeNotes(action.payload));
}

async function fetchNotes() {
    let jsonValue;
    try {
        jsonValue = await AsyncStorage.getItem('@notes_data');
    } catch (e) {
        // error reading value
    }

    return JSON.parse(jsonValue);
}

async function storeNotes(notesToStore) {
    try {
        const jsonValue = JSON.stringify(notesToStore);
        await AsyncStorage.setItem('@notes_data', jsonValue)
      } catch (e) {
        // saving error
    }

    let jsonValue;
    try {
        jsonValue = await AsyncStorage.getItem('@notes_data');
    } catch (e) {
        // error reading value
    }
}