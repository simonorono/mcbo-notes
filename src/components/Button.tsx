import React from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Button(props: Props) {
  const { children, className, onClick } = props

  const uniqueClasses = new Set([
    ...['rounded', 'bg-black', 'p-1', 'text-white'],
    ...(className?.split(' ') || []),
  ])

  return (
    <button
      className={[...uniqueClasses].join(' ')}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  )
}
