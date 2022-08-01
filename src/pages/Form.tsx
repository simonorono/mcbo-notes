import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Editor, RichTextEditor } from '@mantine/rte'
import Button from '../components/Button'
import Toolbar from '../components/Toolbar'
import { saveNote, updateNote, useAppDispatch, useAppSelector } from '../store'

const FORM_BUTTON_CLASSES = 'w-[4em] font-semibold'

export default function Form() {
  const { id } = useParams()

  const existingNote = useAppSelector(state => state.notes.byId[Number(id)])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [note, setNote] = useState(
    existingNote ||
      ({
        id: 0,
        title: '',
        content: '',
      } as Note)
  )

  const editor = useRef<Editor>(null)

  const onCancelClicked = () => {
    navigate('/')
  }

  const onSaveClicked = () => {
    if (note.id) {
      dispatch(updateNote(note))
    } else {
      dispatch(saveNote(note))
    }
    navigate('/')
  }

  const updateNoteFields = (diff: { [key: string]: string }) => {
    setNote({ ...note, ...diff })
  }

  return (
    <div className="flex h-screen flex-col">
      <Toolbar>
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-bold">
            {id && 'Edit note'}
            {!id && 'New note'}
          </h1>

          <div className="space-x-2">
            <Button className={FORM_BUTTON_CLASSES} onClick={onCancelClicked}>
              Cancel
            </Button>

            <Button className={FORM_BUTTON_CLASSES} onClick={onSaveClicked}>
              Save
            </Button>
          </div>
        </div>
      </Toolbar>

      <div className="mt-6 flex flex-grow flex-col space-y-4">
        <div className="relative mx-2 rounded-md border border-gray-300 px-3 py-2 shadow-sm">
          <label
            htmlFor="note-title"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-sm font-medium text-gray-900"
          >
            Title
          </label>

          <input
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500"
            id="note-title"
            name="title"
            onChange={ev => updateNoteFields({ title: ev.target.value })}
            placeholder="Note title"
            value={note.title}
          />
        </div>

        <RichTextEditor
          ref={editor}
          classNames={{
            root: 'flex-grow cursor-text border-0',
          }}
          controls={[
            ['bold', 'italic', 'underline', 'strike', 'code', 'clean'],
            ['h1', 'h2', 'h3', 'h4'],
            ['unorderedList', 'orderedList'],
            ['alignCenter', 'alignLeft', 'alignRight'],
            ['sup', 'sub'],
            ['link', 'blockquote', 'codeBlock', 'image'],
          ]}
          onClick={() => editor.current?.focus()}
          onChange={content => updateNoteFields({ content })}
          value={note.content}
        />
      </div>
    </div>
  )
}
