import types from "./../types.js";

const initialState = {
    notes: [],
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NOTE: {
            return { ...state, notes: [...state.notes, action.payload] };
        }
        case types.EDIT_NOTE: {
            const noteId = action.payload.id;
            const newNotes = state.notes;

            for (let i = 0; i < newNotes.length; i++) {
                if (newNotes[i].id === noteId) {
                    newNotes[i] = action.payload;
                    break;
                }
            }

            return { ...state, notes: newNotes };
        }
        case types.DELETE_NOTE: {
            const newNotes = state.notes;
            
            for (let i = 0; i < newNotes.length; i++) {
              if (newNotes[i] === action.payload) {
                newNotes.splice(i, 1);
                break;
              }
            }
        
            return { ...state, notes: newNotes };
        }
        case types.REQUEST_NOTES: {
            return { ...state, notes: action.payload }
        }
        default:
            return state;
    }
}

export default notesReducer;