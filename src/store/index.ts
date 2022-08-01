import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notesReducer, {
  deleteNote,
  loadAllNotes,
  saveNote,
  updateNote,
} from './noteSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
})

type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export { deleteNote, loadAllNotes, saveNote, updateNote }

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
