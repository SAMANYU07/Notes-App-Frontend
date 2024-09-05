import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    currentNote: null,
    newNoteWin: false,
    loading: false,
    showBookmarked: false,
};

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action) => {
            try {
                return {
                    ...state,
                    notes: [...state.notes, action.payload]
                }
            } catch (error) {
                console.log("Error adding note", error);
            }
        },
        updateCurrentNote: (state, action) => {
            try {
                return {
                    ...state,
                    ...state.notes,
                    currentNote: action.payload,
                }
            } catch (error) {
                console.log("Error updating currentNote: ", error);
            }
        },
        updateNote: (state, action) => {
            const updatedNote = action.payload;
            // const updatedNotes = state.notes?.map(note => {
            //     if (note._id == updatedNote._id) {
            //         note.title = updatedNote.title;
            //         note.noteContent = updatedNote.noteContent;
            //     }
            // })
            try {
                state.notes.map(note => {
                    if (note._id == updatedNote._id) {
                        note.title = updatedNote.title;
                        note.noteContent = updatedNote.noteContent;
                    }
                })
            } catch (error) {
                console.log("Error updating note in redux", error.message);
            }
        },
        deleteNote: (state, action) => {
            try {
                console.log("id of deletion", action.payload);
                const updatedNotes = state.notes?.filter(note => note._id != action.payload);
                return {
                    ...state,
                    notes: updatedNotes,
                }
            } catch (error) {
                console.log("Error in note deletion", error);
            }
        },
        toggleNewNoteWin: (state, action) => {
            state.newNoteWin = action.payload;
        },
        toggleLoading: (state, action) => {
            state.loading = action.payload;
        },
        toggleShowBookmarked: (state, action) => {
            state.showBookmarked = action.payload;
        },
    }
})

export const {addNote, updateCurrentNote, deleteNote, updateNote, toggleNewNoteWin, toggleLoading, toggleShowBookmarked} = noteSlice.actions;
export default noteSlice.reducer;