import React from 'react';
import { assets } from '../assets/assets';

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Patient",
      image: assets.testimonial_1,
      text: "The real-time queue tracking is a game changer. I knew exactly when to leave my house, no more sitting in the waiting room for an hour!",
    },
    {
      name: "Michael Thompson",
      role: "Patient",
      image: assets.testimonial_2,
      text: "Booking was incredibly smooth. I found a top-rated cardiologist in minutes. Highly recommend MediQueue for anyone who values their time.",
    },
    {
      name: "David Lee",
      role: "Patient",
      image: assets.testimonial_3,
      text: "The platform is beautiful and so easy to use. The doctors are professional, and the whole experience feels very premium.",
    }
  ];

  return (
    <div className="py-20 bg-slate-50 rounded-3xl mb-16 mx-4 md:mx-10 border border-gray-100">
      <div className="text-center max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our <span className="text-primary">Patients</span> Say</h2>
        <p className="text-lg text-gray-600">
          Don't just take our word for it. Hear from those who have experienced the MediQueue difference.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <div className="flex gap-1 text-yellow-400 mb-6">
              ★★★★★
            </div>
            <p className="text-gray-600 italic mb-8 line-clamp-4">
              "{review.text}"
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-accent" />
              <div>
                <h4 className="font-bold text-gray-900">{review.name}</h4>
                <p className="text-xs text-gray-500">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
