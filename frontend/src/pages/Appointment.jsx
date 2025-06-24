import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { doctors, currencySymbol } = useContext(AppContext);
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] =useState([]);
  const [slotIndex, setSlotIndex] =useState(0);
  const [slotTime,setSlotTime] =useState('')

  const getAvailableSlots = async () => {
    setDocSlots([]);
    const today=new Date();
        
    for(let i=0;i<7;i++){
      const currentDate=new Date(today)
      currentDate.setDate(today.getDate()+i)
      const endTime=new Date(currentDate);
      endTime.setHours(21,0,0,0);

      if(i===0){
      if(currentDate.getHours()>=18) continue;
      currentDate.setHours(currentDate.getHours()+1)
      currentDate.setMinutes(currentDate.getMinutes()>30 ? 0:30);
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots=[];
      while(currentDate<endTime){
        const formattedTime=currentDate.toLocaleTimeString([],{
          hour: '2-digit',
          minute: '2-digit',
        })

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        })
        currentDate.setMinutes(currentDate.getMinutes()+30);
      }
      setDocSlots((prev)=>[...prev,timeSlots])
    }

    
};

  useEffect(()=>{
    getAvailableSlots();
  },[docInfo])

  const fetchDocInfo = async() => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return docInfo && (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        
        <div>
          <img
            className="bg-primary w-full sm:w-60 rounded-lg object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        
        <div className="flex-1 border border-gray-400 rounded-lg p-4 bg-white mx-2 sm:mx-0 sm:w-[calc(100%-15rem)]">
          <p className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          
          <div className="mt-3">
            <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
              About
              <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>

          
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
