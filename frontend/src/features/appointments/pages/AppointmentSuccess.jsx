import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const AppointmentSuccess = () => {
  return (
    <div className="w-full px-4 md:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-secondary-DEFAULT mb-4">
          Appointment Booked Successfully!
        </h1>
        <p className="text-gray-600 mb-8">
          We've sent a confirmation email with all the details. 
          Our team will review your appointment and contact you if any changes are needed.
        </p>
        <div className="space-x-4">
          <Link
            to="/appointment/manage"
            className="inline-block bg-primary hover:bg-primary-light text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            View My Appointments
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess; 