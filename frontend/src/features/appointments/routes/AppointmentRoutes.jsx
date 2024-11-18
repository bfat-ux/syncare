import { Routes, Route } from 'react-router-dom';
import BookAppointment from '../pages/BookAppointment';
import AppointmentSuccess from '../pages/AppointmentSuccess';
import AppointmentPage from '../pages/AppointmentPage';

const AppointmentRoutes = () => {
  return (
    <Routes>
      <Route path="/book" element={<BookAppointment />} />
      <Route path="/success" element={<AppointmentSuccess />} />
      <Route path="/manage" element={<AppointmentPage />} />
    </Routes>
  );
};

export default AppointmentRoutes;
