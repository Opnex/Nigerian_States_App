import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../../Frontend/src/components/Signup'
import Login from '../../Frontend/src/components/Login'
import Dashboard from '../../Frontend/src/components/Dashboard'

export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

function ProtectedRoute({ children }){
  const user = localStorage.getItem('user')
  if(!user) return <Navigate to='/login' replace />
  return children
}
