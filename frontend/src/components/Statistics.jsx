import React from 'react';

const Statistics = () => {
  const stats = [
    { label: "Doctors", value: "500+" },
    { label: "Patients", value: "10,000+" },
    { label: "Specializations", value: "50+" },
    { label: "Patient Satisfaction", value: "98%" }
  ];

  return (
    <div className="py-12 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-500 font-medium text-sm md:text-base text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
