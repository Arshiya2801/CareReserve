import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { doctors } from '../assets/assets';

const Doctors = () => {
  
  const navigate=useNavigate();
  const {speciality}=useParams();
  const {doctors} =useContext(AppContext);
  const [showFilter,setShowFilter] =useState(false)
  const [filterDoc,setFilterDoc]=useState([]);

  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter((doc)=>doc.speciality.toLowerCase()===speciality.toLowerCase()));
    }
    else{
      setFilterDoc(doctors);
    }
  }

  useEffect(()=>{
    applyFilter();
  },[doctors,speciality])

  const handleSpecialityClick=(spec)=>{
      if (spec === 'All') {
        navigate('/doctors');

      } else {
        navigate(`/doctors/${spec}`);
      }
  };

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-primary text-white':""}`}onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={`flex-col gap-4 text:sm text-gray-600 ${showFilter? 'flex': 'hidden sm:flex'}`}>
          <p onClick={()=> handleSpecialityClick('Pediatricians')} className={`w-[94vw] sm:w-auto pl- py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Pediatricians'? 'bg-primary text-white':""} `}>Pediatricians</p>
          <p onClick={()=> handleSpecialityClick('Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurologist'? 'bg-primary text-white':""} `}>Neurologist</p>
          <p onClick={()=> handleSpecialityClick('All')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${!speciality ? 'bg-primary text-white':""} `}>All Doctors</p>
          <p onClick={()=> handleSpecialityClick('General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General physician'? 'bg-primary text-white':""} `}>General physician</p>
          <p onClick={()=> handleSpecialityClick('Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist'? 'bg-primary text-white':""} `}>Gynecologist</p>
          <p onClick={()=> handleSpecialityClick('Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist'? 'bg-primary text-white':""} `}>Dermatologist</p>
          <p onClick={()=> handleSpecialityClick('Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gastroenterologist'? 'bg-primary text-white':""} `}>Gastroenterologist</p>
          
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-2'>
          {
            filterDoc.map((item, index) => (
            <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            >
                <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt="" />
                <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors