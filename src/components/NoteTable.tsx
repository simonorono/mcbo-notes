import { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

const ACTIONS_CLASSES = 'text-green-800'

interface Props {
  notes: Note[]
}

export default function NoteTable(props: Props) {
  const { notes } = props

  const [toBeDeleted, setToBeDeleted] = useState(null as Note | null)

  return (
    <>
      <table className="border-b-200 min-w-full divide-y divide-gray-300 border">
        <thead></thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {notes.map(note => (
            <tr key={note.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {note.title}
              </td>
              <td className="relative space-x-4 whitespace-nowrap py-4 pl-3 pr-8 text-right text-sm font-medium">
                <Link className={ACTIONS_CLASSES} to={`/form/${note.id}`}>
                  Edit
                </Link>
                <a
                  className={`${ACTIONS_CLASSES} cursor-pointer`}
                  onClick={() => setToBeDeleted(note)}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal note={toBeDeleted} onClose={() => setToBeDeleted(null)} />
    </>
  )
}
