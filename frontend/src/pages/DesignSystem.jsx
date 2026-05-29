import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';

const DesignSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h1 className="text-4xl font-black text-primary">Design System Playground</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">MediQueue Component Library Verification</p>
        </div>
        <Button variant="outline" onClick={toggleDarkMode}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      {/* Buttons Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Inputs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <Input 
            label="Standard Input" 
            placeholder="Type something..." 
          />
          <Input 
            label="Input with Error" 
            placeholder="john@example.com" 
            error="Please enter a valid email address." 
          />
          <Input 
            label="Disabled Input" 
            placeholder="Cannot type here" 
            disabled 
          />
        </div>
      </section>

      {/* Cards Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader title="Premium Profile Card" subtitle="Manage your settings" />
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">This is the content inside the card. It looks clean and modern with glassmorphism elements.</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Loaders & Empty States Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Feedback States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-500 font-medium">Loading resources...</p>
          </div>
          
          <EmptyState 
            title="No Appointments Found"
            description="You haven't booked any medical appointments yet. When you do, they will appear here."
            action={<Button variant="primary">Book Appointment</Button>}
          />
        </div>
      </section>

      {/* Modal Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Modals</h2>
        <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Action Modal</Button>
        </div>
        
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Confirm Action"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to perform this action? This will update your profile settings permanently.
          </p>
          <div className="flex justify-end gap-3 mt-8">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </section>

    </div>
  );
};

export default DesignSystem;
