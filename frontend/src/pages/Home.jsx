import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import Statistics from '../components/Statistics'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div id="home">
        <Hero />
        <Statistics />
      </div>
      
      <div id="doctors">
        <SpecialityMenu />
        <TopDoctors />
      </div>
      
      <div id="about">
        <HowItWorks />
        <Testimonials />
      </div>

      <div id="contact" className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Have questions or need help? Reach out to our support team.</p>
        
        {/* Contact Info Added for Task 3 */}
        <div className="flex flex-col items-center gap-2 mb-8 text-gray-800 dark:text-gray-200 font-medium">
          <p className="flex items-center gap-2">
            <span>📞</span> +91-12345-67891
          </p>
          <p className="flex items-center gap-2">
            <span>✉️</span> <a href="mailto:support@mediqueue.com" className="text-primary hover:underline">support@mediqueue.com</a>
          </p>
        </div>

        <button className="bg-primary text-white px-8 py-3 rounded-full hover:shadow-lg transition">Get in Touch</button>
      </div>
    </div>
  )
}

export default Home