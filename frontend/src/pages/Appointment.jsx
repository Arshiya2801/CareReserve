import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { doctors, currencySymbol } = useContext(AppContext);
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return docInfo && (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image Section */}
        <div>
          <img
            className="bg-primary w-full sm:w-60 rounded-lg object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        {/* Info Box */}
        <div className="flex-1 border border-gray-400 rounded-lg p-4 bg-white mx-2 sm:mx-0 sm:w-[calc(100%-15rem)]">
          <p className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          {/* About Section */}
          <div className="mt-3">
            <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
              About
              <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>

          {/* Appointment Fee */}
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
