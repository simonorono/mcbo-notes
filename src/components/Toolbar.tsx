import React from 'react'

interface Props {
  children?: React.ReactNode
}

export default function Toolbar(props: Props) {
  const { children } = props

  return (
    <div className="flex justify-end space-x-4 border-b border-black px-4 py-2">
      {children}
    </div>
  )
}
