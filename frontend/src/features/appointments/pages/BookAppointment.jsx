import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const BookAppointment = () => {
  return (
    <div className="w-full px-4 md:px-8 py-8">
      <h1 className="text-xl font-bold text-secondary-DEFAULT mb-6">
        Book an Appointment
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <AppointmentForm />
      </div>
    </div>
  );
};

export default BookAppointment;