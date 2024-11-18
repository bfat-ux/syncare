import { useState, useEffect } from 'react';
import api from '../api/api';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to load appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 md:px-8 py-8">
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8 py-8">
      <h1 className="text-xl font-bold text-secondary-DEFAULT mb-6">
        Manage Appointments
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-secondary-DEFAULT/70">
            No upcoming appointments found.
          </p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.appointment_id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {appointment.details.service_type}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                      {' '}
                      {new Date(appointment.start_time).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm capitalize" 
                    style={{
                      backgroundColor: 
                        appointment.appointment_status === 'scheduled' ? 'rgb(134 239 172)' :
                        appointment.appointment_status === 'cancelled' ? 'rgb(252 165 165)' :
                        'rgb(229 231 235)',
                      color: 
                        appointment.appointment_status === 'scheduled' ? 'rgb(21 128 61)' :
                        appointment.appointment_status === 'cancelled' ? 'rgb(153 27 27)' :
                        'rgb(55 65 81)'
                    }}
                  >
                    {appointment.appointment_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;