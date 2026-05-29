import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import DesignSystem from './pages/DesignSystem'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/design-system' element={<DesignSystem/>} />
        
        {/* Protected Routes */}
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute><About/></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><Contact/></ProtectedRoute>} />
        <Route path='/doctors/:speciality' element={<ProtectedRoute><Doctors/></ProtectedRoute>} />
        <Route path='/doctors' element={<ProtectedRoute><Doctors/></ProtectedRoute>} />
        <Route path='/my-appointments' element={<ProtectedRoute><MyAppointments/></ProtectedRoute>} />
        <Route path='/my-profile' element={<ProtectedRoute><MyProfile/></ProtectedRoute>} />
        <Route path='/appointment/:docId' element={<ProtectedRoute><Appointment/></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
