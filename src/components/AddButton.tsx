import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/outline'

export default function AddButton() {
  return (
    <div className="fixed right-4 bottom-4 h-12 w-12 rounded-full bg-black p-2">
      <Link to="form">
        <PlusIcon className="text-white" />
      </Link>
    </div>
  )
}
