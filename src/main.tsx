import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Form from './pages/Form'
import { store } from './store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:uuid" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
