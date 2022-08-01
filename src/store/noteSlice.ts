import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import DB from './db'

interface NoteState {
  all: Note[]
}

const initialState: NoteState = {
  all: [],
}

const loadAllNotes = createAsyncThunk('notes/load', async () => {
  const db = await DB.getInstance()

  return await db.loadAllNotes()
})

const saveNote = createAsyncThunk('notes/save', async (note: Note) => {
  const db = await DB.getInstance()

  return await db.saveNote(note)
})

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    deleteNote(state, action: PayloadAction<Note>) {
      state.all = state.all.filter(note => note.id != action.payload.id)
    },
  },
  extraReducers: builder => {
    builder.addCase(
      loadAllNotes.fulfilled,
      (state, action: PayloadAction<Note[]>) => {
        state.all = action.payload
      }
    )

    builder.addCase(
      saveNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        state.all.push(action.payload)
      }
    )
  },
})

export const { deleteNote } = noteSlice.actions

export { loadAllNotes, saveNote }

export default noteSlice.reducer
