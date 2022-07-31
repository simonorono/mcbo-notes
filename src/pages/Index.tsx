import AddButton from '../components/AddButton'
import NoteTable from '../components/NoteTable'
import Toolbar from '../components/Toolbar'

import { useAppSelector } from '../store'

export default function Index() {
  const notes = useAppSelector(state => state.notes.all)

  return (
    <>
      <div className="flex max-h-screen flex-col">
        <div className="bg-white">
          <Toolbar>
            <h1 className="w-full text-2xl font-bold">Tauri Notes</h1>
          </Toolbar>
        </div>

        <div className="flex-grow overflow-scroll">
          <NoteTable notes={notes} />

          <div className="mt-20" />
        </div>
      </div>

      <AddButton />
    </>
  )
}
