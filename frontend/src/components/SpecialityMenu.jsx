import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-6 py-20 px-4' id='speciality'>
        <div className="text-center max-w-2xl">
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Medical <span className="text-primary">Specializations</span></h2>
          <p className='text-gray-600 text-lg'>Browse through our extensive list of trusted doctors by their specialized fields and schedule your appointment hassle-free.</p>
        </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 pt-10 w-full max-w-6xl'>
            {specialityData.map((item,index)=>(
                <Link
                    onClick={() => scrollTo(0, 0)}
                    className='group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-teal-100 hover:-translate-y-2 transition-all duration-300'
                    key={index}
                    to={`/doctors/${item.speciality}`}
                    >
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img className='w-10' src={item.image} alt={item.speciality} />
                    </div>
                    <p className='text-sm sm:text-base font-semibold text-gray-800 text-center'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu