import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './contexts/auth'
import MainRoutes from './routes'
import 'react-toastify/dist/ReactToastify.css'

import './styles/scss/main.scss'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRoutes />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
