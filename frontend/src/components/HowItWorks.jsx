import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Create Account",
      desc: "Sign up in seconds to access our premium healthcare network.",
    },
    {
      num: "02",
      title: "Select Doctor",
      desc: "Browse specializations and choose the right expert for your needs.",
    },
    {
      num: "03",
      title: "Book Appointment",
      desc: "Pick an available time slot and instantly confirm your booking.",
    },
    {
      num: "04",
      title: "Track Queue",
      desc: "Watch your wait time in real-time. No more waiting room anxiety.",
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="text-center max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How <span className="text-primary">MediQueue</span> Works</h2>
        <p className="text-lg text-gray-600">
          Your health journey simplified into four easy steps.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Connecting Line for Desktop */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
              <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">{step.num}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
