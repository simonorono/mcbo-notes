import AddButton from '../components/AddButton'
import NoteTable from '../components/NoteTable'
import Toolbar from '../components/Toolbar'

import { useAppSelector } from '../store'

export default function Index() {
  const notes = useAppSelector(state => state.notes.all)

  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="bg-white">
          <Toolbar>
            <h1 className="w-full text-2xl font-bold">Mcbo Notes</h1>
          </Toolbar>
        </div>

        <div className="flex-grow overflow-scroll">
          {notes.length > 0 && (
            <>
              <NoteTable notes={notes} />

              <div className="mt-20" />
            </>
          )}

          {notes.length <= 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-lg">There are no notes.</p>
            </div>
          )}
        </div>
      </div>

      <AddButton />
    </>
  )
}
