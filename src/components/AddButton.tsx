import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/outline'

export default function AddButton() {
  return (
    <Link
      className="fixed right-4 bottom-4 inline-block h-12 w-12 rounded-full bg-black p-2"
      title="Add new note"
      to="form"
    >
      <PlusIcon className="text-white" />
    </Link>
  )
}
