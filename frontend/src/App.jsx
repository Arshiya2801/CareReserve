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
import PatientDashboard from './pages/patient/PatientDashboard'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
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
        
        {/* Protected Patient Routes */}
        <Route path='/patient/dashboard' element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard/></ProtectedRoute>} />
        <Route path='/' element={<ProtectedRoute allowedRoles={['patient']}><Home/></ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute allowedRoles={['patient']}><About/></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute allowedRoles={['patient']}><Contact/></ProtectedRoute>} />
        <Route path='/doctors/:speciality' element={<ProtectedRoute allowedRoles={['patient']}><Doctors/></ProtectedRoute>} />
        <Route path='/doctors' element={<ProtectedRoute allowedRoles={['patient']}><Doctors/></ProtectedRoute>} />
        <Route path='/my-appointments' element={<ProtectedRoute allowedRoles={['patient']}><MyAppointments/></ProtectedRoute>} />
        <Route path='/my-profile' element={<ProtectedRoute allowedRoles={['patient', 'doctor']}><MyProfile/></ProtectedRoute>} />
        <Route path='/appointment/:docId' element={<ProtectedRoute allowedRoles={['patient']}><Appointment/></ProtectedRoute>} />

        {/* Protected Doctor Routes */}
        <Route path='/doctor/dashboard' element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard/></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
