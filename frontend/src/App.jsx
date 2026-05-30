import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
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
import PatientDashboard from './pages/patient/PatientDashboard'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorProfile from './pages/DoctorProfile'
import BookingFlow from './pages/BookingFlow'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/design-system' element={<DesignSystem/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctor/:docId' element={<DoctorProfile/>} />
        
        {/* Protected Patient Routes */}
        <Route path='/patient/dashboard' element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard/></ProtectedRoute>} />
        <Route path='/my-appointments' element={<ProtectedRoute allowedRoles={['patient']}><MyAppointments/></ProtectedRoute>} />
        <Route path='/my-profile' element={<ProtectedRoute allowedRoles={['patient', 'doctor']}><MyProfile/></ProtectedRoute>} />
        <Route path='/book/:docId' element={<ProtectedRoute allowedRoles={['patient']}><BookingFlow/></ProtectedRoute>} />
        
        {/* Legacy route redirect */}
        <Route path='/appointment/:docId' element={<Navigate to="/doctors" replace />} />

        {/* Protected Doctor Routes */}
        <Route path='/doctor/dashboard' element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard/></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
