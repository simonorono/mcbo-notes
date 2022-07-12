import AddButton from '../components/AddButton'
import Toolbar from '../components/Toolbar'

export default function Index() {
  return (
    <>
      <div>
        <Toolbar>
          <h1 className="w-full text-2xl font-bold">Tauri Notes</h1>
        </Toolbar>
      </div>

      <AddButton />
    </>
  )
}
