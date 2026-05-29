import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import DiscoveryTopBar from '../components/discovery/DiscoveryTopBar';
import DoctorListCard from '../components/discovery/DoctorListCard';
import DoctorPreview from '../components/discovery/DoctorPreview';
import BookingCalendar from '../components/discovery/BookingCalendar';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  
  const [filterDoc, setFilterDoc] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [filters, setFilters] = useState({
    speciality: speciality || '',
    availability: ''
  });

  // Apply search and filters
  const applyFilters = () => {
    let filtered = doctors;

    // Search by name or spec
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(term) || 
        doc.speciality.toLowerCase().includes(term)
      );
    }

    // Filter by Speciality dropdown
    if (filters.speciality) {
      filtered = filtered.filter(doc => doc.speciality.toLowerCase() === filters.speciality.toLowerCase());
    }

    // Filter by Availability
    if (filters.availability === 'Available') {
      filtered = filtered.filter(doc => doc.available);
    }

    setFilterDoc(filtered);
    
    // Auto-select first doctor if list changes and current selection is not in list
    if (filtered.length > 0) {
      if (!selectedDoctor || !filtered.find(d => d._id === selectedDoctor._id)) {
        setSelectedDoctor(filtered[0]);
      }
    } else {
      setSelectedDoctor(null);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [doctors, searchTerm, filters]);

  // Sync route param with filters on mount
  useEffect(() => {
    if (speciality) {
      setFilters(prev => ({ ...prev, speciality }));
    }
  }, [speciality]);

  const handleBookAppointment = async (docId, date, time) => {
    if (!token) {
      toast.error("Please login to book an appointment");
      navigate('/login');
      return;
    }

    setIsBooking(true);
    try {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/appointments/book',
        { docId, slotDate, slotTime: time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Appointment booked successfully!");
        getDoctorsData(); 
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pt-6 pb-12 animate-fade-in">
      
      {/* Top Search & Filter Bar */}
      <DiscoveryTopBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[800px]">
        
        {/* LEFT COLUMN: List */}
        <div className="lg:col-span-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/30">
            <h3 className="font-bold text-gray-900 dark:text-white">
              {filterDoc.length} Doctors found
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filterDoc.length > 0 ? (
              filterDoc.map(doc => (
                <DoctorListCard 
                  key={doc._id} 
                  doctor={doc} 
                  isSelected={selectedDoctor?._id === doc._id}
                  onClick={() => setSelectedDoctor(doc)}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No doctors match your criteria.</p>
                <button onClick={() => {setSearchTerm(''); setFilters({speciality:'', availability:''})}} className="mt-4 text-primary font-medium hover:underline">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CENTER COLUMN: Preview */}
        <div className="hidden lg:block lg:col-span-4">
          <DoctorPreview 
            doctor={selectedDoctor} 
            currencySymbol={currencySymbol} 
          />
        </div>

        {/* RIGHT COLUMN: Booking */}
        <div className="hidden lg:block lg:col-span-4">
          <BookingCalendar 
            doctor={selectedDoctor}
            onBook={handleBookAppointment}
            isLoading={isBooking}
          />
        </div>

      </div>

      {/* Mobile Modal for Preview & Booking (Visible only on small screens) */}
      {/* For simplicity in this iteration, we use standard stacking if they are selected on mobile, but ideally a drawer opens */}
      <div className="lg:hidden mt-8 space-y-6">
        {selectedDoctor && (
          <>
            <div className="h-[600px]"><DoctorPreview doctor={selectedDoctor} currencySymbol={currencySymbol} /></div>
            <div className="h-[600px]"><BookingCalendar doctor={selectedDoctor} onBook={handleBookAppointment} isLoading={isBooking} /></div>
          </>
        )}
      </div>

    </div>
  );
};

export default Doctors;