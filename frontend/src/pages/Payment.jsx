import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, backendUrl, token, currencySymbol, getDoctorsData } = useContext(AppContext);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('razorpay');

  const paymentMethods = [
    { id: 'razorpay', label: 'Razorpay', icon: '💳' },
    { id: 'upi', label: 'UPI / QR', icon: '📱' },
    { id: 'card', label: 'Credit / Debit Card', icon: '🏦' },
    { id: 'netbanking', label: 'Net Banking', icon: '🌐' }
  ];

  // If no state is passed, redirect back
  useEffect(() => {
    if (!location.state || !location.state.docId) {
      toast.error("Invalid payment session");
      navigate('/doctors');
    }
  }, [location, navigate]);

  if (!location.state || !location.state.doctor) return null;

  const { docId, selectedDate, selectedTime, doctor } = location.state;

  const consultationFee = doctor.fees;
  const platformFee = 50;
  const taxes = 18; // Flat tax for demo
  const totalAmount = consultationFee + platformFee + taxes;

  const handlePayment = async () => {
    if (!token) {
      toast.error("Please login to complete payment");
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway delay
    setTimeout(async () => {
      try {
        let day = selectedDate.getDate();
        let month = selectedDate.getMonth() + 1;
        let year = selectedDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const { data } = await axios.post(
          backendUrl + '/api/appointments/book',
          { docId, slotDate, slotTime: selectedTime },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          setIsProcessing(false);
          getDoctorsData(); 
          navigate('/confirmation', { 
            state: { doctor, selectedDate, selectedTime } 
          });
        } else {
          setIsProcessing(false);
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        setIsProcessing(false);
        toast.error(error.response?.data?.message || error.message);
      }
    }, 2000);
  };



  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-slate-900 py-10 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Secure Checkout</h1>
          <p className="text-gray-500 mt-2">Review your details and complete your payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column - Details & Methods */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Patient Summary */}
            <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-surface-dark">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>👤</span> Patient Details
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="font-bold text-gray-900 dark:text-white mt-1">{userData ? userData.name : 'Loading...'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="font-bold text-gray-900 dark:text-white mt-1">{userData ? userData.email : 'Loading...'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Summary */}
            <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-surface-dark">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>📅</span> Appointment Summary
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{doctor.name}</h4>
                    <p className="text-primary font-medium text-sm">{doctor.speciality}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-gray-900 dark:text-white">Date:</span> {selectedDate.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-gray-900 dark:text-white">Time:</span> {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-surface-dark">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🔒</span> Select Payment Method
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                        selectedMethod === method.id 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                          : 'border-gray-200 dark:border-slate-700 hover:border-primary/50 bg-transparent'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id ? 'border-primary' : 'border-gray-300'
                      }`}>
                        {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{method.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <Card className="border border-gray-100 dark:border-slate-700 shadow-lg bg-white dark:bg-surface-dark overflow-hidden">
                <div className="bg-slate-900 dark:bg-slate-800 p-6">
                  <h3 className="font-bold text-lg text-white">Payment Summary</h3>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                      <span>Consultation Fee</span>
                      <span className="font-medium">{currencySymbol}{consultationFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                      <span>Platform Fee</span>
                      <span className="font-medium">{currencySymbol}{platformFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                      <span>Taxes & GST</span>
                      <span className="font-medium">{currencySymbol}{taxes}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dashed border-gray-300 dark:border-slate-600 flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white text-lg">Total Amount</span>
                    <span className="font-black text-primary text-3xl">{currencySymbol}{totalAmount}</span>
                  </div>

                  <div className="pt-6 space-y-3">
                    <Button 
                      fullWidth 
                      size="lg" 
                      onClick={handlePayment} 
                      isLoading={isProcessing}
                    >
                      {isProcessing ? 'Processing Payment...' : `Pay ${currencySymbol}${totalAmount}`}
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outline" 
                      onClick={() => navigate(-1)}
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    256-bit SSL Encrypted
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
