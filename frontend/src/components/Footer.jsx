import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div >
                <img className='mb-5 w-40' src={assets.logo} alt=''/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>At CareReserve, we connect patients with trusted healthcare professionals — making it easy to book appointments, access quality care, and manage your health anytime, anywhere.</p>
            </div>
            <div className='text-xl font-medium mb-5' > 
                <p>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600 text-sm mt-5'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='text-xl font-medium mb-5'>
                <p>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600 mt-5 text-sm'>
                    <li>+1-213-456-6542</li>
                    <li>CareReserve@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2025 CareReserve - All Right Reserved.</p>
            </div>
        </div>

    
    )
}

export default Footer