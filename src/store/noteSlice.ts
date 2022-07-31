import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NoteState {
  all: Note[]
}

const initialState: NoteState = {
  all: [],
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setAllNotes(state, action: PayloadAction<Note[]>) {
      state.all = action.payload
    },
    saveNote(state, action: PayloadAction<Note>) {
      state.all = [...state.all, action.payload]
    },
    deleteNote(state, action: PayloadAction<Note>) {
      state.all = state.all.filter(note => note.id != action.payload.id)
    },
  },
})

export const { deleteNote, saveNote, setAllNotes } = noteSlice.actions

export default noteSlice.reducer
