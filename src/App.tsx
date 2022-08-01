import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Form from './pages/Form'
import { loadAllNotes, useAppDispatch } from './store'

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadAllNotes())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}
