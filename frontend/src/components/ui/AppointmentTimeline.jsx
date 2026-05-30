import React from 'react';

const STAGES = [
  { id: 1, title: 'Appointment Booked', subtitle: 'Slot secured', icon: '📅' },
  { id: 2, title: 'Payment Completed', subtitle: 'Gateway confirmed', icon: '💳' },
  { id: 3, title: 'Doctor Accepted', subtitle: 'Clinic acknowledged', icon: '👨‍⚕️' },
  { id: 4, title: 'Patient Waiting', subtitle: 'Arrived at clinic', icon: '🛋️' },
  { id: 5, title: 'Consultation Started', subtitle: 'In session', icon: '🩺' },
  { id: 6, title: 'Consultation Completed', subtitle: 'Visit finished', icon: '✅' }
];

const AppointmentTimeline = ({ currentStageId = 3, appointmentDate }) => {
  // Generate mock timestamps based on the base appointment date
  const generateMockTime = (stageId) => {
    if (stageId > currentStageId) return '--:--';
    const base = new Date();
    base.setMinutes(base.getMinutes() - (currentStageId - stageId) * 15);
    return base.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full max-w-md mx-auto py-6">
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-slate-700 before:to-transparent">
        
        {STAGES.map((stage, index) => {
          const isActive = stage.id <= currentStageId;
          const isCurrent = stage.id === currentStageId;
          
          return (
            <div key={stage.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon Marker */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-500 ${
                isActive 
                  ? 'bg-primary border-white dark:border-surface-dark text-white' 
                  : 'bg-gray-100 dark:bg-slate-800 border-white dark:border-surface-dark text-gray-400 grayscale'
              }`}>
                {isCurrent && (
                  <span className="absolute w-14 h-14 rounded-full border-2 border-primary animate-ping opacity-20"></span>
                )}
                <span className="text-sm">{stage.icon}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-surface-dark transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                  <h3 className={`font-bold text-sm ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                    {stage.title}
                  </h3>
                  <time className={`text-xs font-mono font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                    {generateMockTime(stage.id)}
                  </time>
                </div>
                <p className={`text-xs ${isActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-300 dark:text-gray-600'}`}>
                  {stage.subtitle}
                </p>
              </div>
              
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default AppointmentTimeline;
