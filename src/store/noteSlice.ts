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
    saveNote(state, action: PayloadAction<Note>) {
      state.all = [...state.all, action.payload]
    },
  },
})

export const { saveNote } = noteSlice.actions

export default noteSlice.reducer
