import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'

const App = () => {
  return (
    <div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>

    </div>
  )
}

export default App