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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <Statistics />
      <SpecialityMenu />
      <HowItWorks />
      <TopDoctors />
      <Testimonials />
      {/* Keeping Banner if we want it, but the prompt didn't strictly require it. I'll omit it for cleaner look as it was part of the old design. */}
    </div>
  )
}

export default Home