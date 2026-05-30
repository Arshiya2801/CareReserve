import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const PublicLayout = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
