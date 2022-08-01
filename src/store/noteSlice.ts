import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import DB from './db'

interface NoteState {
  all: Note[]
  byId: { [id: number]: Note }
}

const initialState: NoteState = {
  all: [],
  byId: {},
}

const deleteNote = createAsyncThunk('notes/delete', async (note: Note) => {
  const db = await DB.getInstance()

  await db.deleteNote(note)

  return note
})

const loadAllNotes = createAsyncThunk('notes/load', async () => {
  const db = await DB.getInstance()

  return await db.loadAllNotes()
})

const saveNote = createAsyncThunk('notes/save', async (note: Note) => {
  const db = await DB.getInstance()

  return await db.saveNote(note)
})

const updateNote = createAsyncThunk('notes/update', async (note: Note) => {
  const db = await DB.getInstance()

  await db.updateNote(note)

  return await db.loadAllNotes()
})

function noteComparer(a: Note, b: Note) {
  const titleA = a.title.toLowerCase()
  const titleB = b.title.toLowerCase()

  if (titleA < titleB) {
    return -1
  } else if (titleA > titleB) {
    return 1
  }

  return 0
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      deleteNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        state.all = state.all.filter(note => note.id != action.payload.id)
        state.byId = {}
        state.all.forEach(note => {
          state.byId[note.id] = note
        })
      }
    )

    builder.addCase(
      loadAllNotes.fulfilled,
      (state, action: PayloadAction<Note[]>) => {
        state.all = action.payload.sort(noteComparer)

        action.payload.forEach(note => {
          state.byId[note.id] = note
        })
      }
    )

    builder.addCase(
      saveNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        const note = action.payload

        state.all.push(note)
        state.byId[note.id] = note

        state.all = state.all.sort(noteComparer)
      }
    )

    builder.addCase(
      updateNote.fulfilled,
      (state, action: PayloadAction<Note[]>) => {
        state.all = action.payload.sort(noteComparer)
        state.byId = {}
        action.payload.forEach(note => {
          state.byId[note.id] = note
        })
      }
    )
  },
})

export { deleteNote, loadAllNotes, saveNote, updateNote }

export default noteSlice.reducer
