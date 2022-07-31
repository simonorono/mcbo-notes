import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RichTextEditor } from '@mantine/rte'
import Button from '../components/Button'
import Toolbar from '../components/Toolbar'
import { saveNote, useAppDispatch } from '../store'

const FORM_BUTTON_CLASSES = 'w-[4em] font-semibold'

export default function Form() {
  const { uuid } = useParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [note, setNote] = useState({
    id: 0,
    uuid: uuid || '',
    title: '',
    content: '',
  } as Note)

  const onCancelClicked = () => {
    navigate('/')
  }

  const onSaveClicked = () => {
    dispatch(saveNote(note))
    navigate('/')
  }

  const updateNote = (diff: { [key: string]: number | string }) => {
    setNote({ ...note, ...diff })
  }

  return (
    <>
      <Toolbar>
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-bold">
            {uuid && 'Edit note'}
            {!uuid && 'New note'}
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

      <div className="mt-6 flex flex-col space-y-4">
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
            onChange={ev => updateNote({ title: ev.target.value })}
            placeholder="Note title"
            value={note.title}
          />
        </div>

        <RichTextEditor
          classNames={{
            root: 'border-0 flex-grow',
          }}
          controls={[
            ['bold', 'italic', 'underline', 'strike', 'code', 'clean'],
            ['h1', 'h2', 'h3', 'h4'],
            ['unorderedList', 'orderedList'],
            ['alignCenter', 'alignLeft', 'alignRight'],
            ['sup', 'sub'],
            ['link', 'blockquote', 'codeBlock', 'image'],
          ]}
          onChange={content => updateNote({ content })}
          value={note.content}
        />
      </div>
    </>
  )
}
