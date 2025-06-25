import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <section className="flex flex-col items-center gap-4 my-16 px-4 md:px-10 text-gray-900">
        <h2 className="text-3xl font-semibold text-center">Top Doctors to Book</h2>
        <p className="text-sm text-center max-w-xl">
            Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-6">
            {doctors.slice(0, 10).map((item, index) => (
            <div
                key={index}
                onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
                }}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md"
            >
                <img
                className="w-full h-48 object-cover bg-blue-50"
                src={item.image}
                alt={`${item.name} profile`}
                />
                <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Available</span>
                </div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
                </div>
            </div>
            ))}
        </div>

        <button
            onClick={() => {
            window.scrollTo(0, 0);
            navigate('/doctors');
            }}
            className="bg-blue-50 text-gray-700 px-8 py-3 rounded-full mt-10 hover:bg-blue-100 transition"
        >
            View More
        </button>
        </section>
    );
};

export default TopDoctors;
