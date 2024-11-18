import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { appointmentServices } from '../data/appointmentConfig';

const DEFAULT_PRACTITIONER_ID = 'default-practitioner-id';

const AppointmentForm = ({ initialService = '', onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: initialService,
    preferredDate: '',
    preferredTime: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        // Log patient data being sent
        const patientData = {
            first_name: formData.patientName.split(' ')[0],
            last_name: formData.patientName.split(' ')[1] || '',
            contact_info: {
                email: formData.patientEmail,
                phone: formData.patientPhone
            },
            gender: 'unknown',
            birth_date: null,
            status: 'active'
        };
        console.log('Creating patient with data:', patientData);
        
        const patientResponse = await api.post('/patients', patientData);
        console.log('Patient creation response:', patientResponse);

        // Calculate appointment times
        const startTime = new Date(`${formData.preferredDate} ${formData.preferredTime}`);
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);

        // Log appointment data being sent
        const appointmentData = {
            appointment_date: new Date(formData.preferredDate).toISOString(),
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            appointment_status: 'scheduled',
            appointment_type: 'routine',
            provider_id: DEFAULT_PRACTITIONER_ID,
            patient_id: patientResponse.data.patient_id,
            details: {
                notes: formData.notes || '',
                priority: 0,
                location: 'Main Clinic',
                service_type: formData.serviceType
            }
        };
        console.log('Creating appointment with data:', appointmentData);

        const response = await api.post('/appointments', appointmentData);
        console.log('Appointment creation response:', response);

        if (response.status === 201) {
            if (onSuccess) {
                onSuccess();
            }
            navigate('/appointment/success');
        }
    } catch (err) {
        console.error('Full error:', err);
        const errorMessage = err.response?.data?.details || 
                           err.response?.data?.error || 
                           err.message ||
                           'Failed to book appointment';
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Type
        </label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="">Select a service</option>
          {appointmentServices.map(service => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time
          </label>
          <input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="patientPhone"
          value={formData.patientPhone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-primary hover:bg-primary-light text-white font-bold py-3 px-4 rounded-md transition-colors ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;
