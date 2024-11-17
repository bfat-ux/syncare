import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SpecializedConsultations from './pages/SpecializedConsultations';
import NewbornCare from './pages/NewbornCare';
import Immunization from './pages/Immunization';
import GeneralPediatric from './pages/GeneralPediatric';
import LaboratoryDiagnostics from './pages/LaboratoryDiagnostics';
import Telemedicine from './pages/Telemedicine';
import AppointmentPage from './features/appointments/pages/AppointmentPage';
import BookAppointment from './features/appointments/pages/BookAppointment';
import AppointmentSuccess from './features/appointments/pages/AppointmentSuccess';
// import PractitionerRegistrationForm from './features/practitioners/components/PractitionerRegistrationForm';
// // import PractitionerDashboard from './features/practitioners/components/PractitionerDashboard';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/specialized-consultations" element={<SpecializedConsultations />} />
              <Route path="/services/newborn-care" element={<NewbornCare />} />
              <Route path="/services/immunizations" element={<Immunization />} />
              <Route path="/services/general-pediatric" element={<GeneralPediatric />} /> 
              <Route path="/services/laboratory-diagnostics" element={<LaboratoryDiagnostics />} />
              <Route path="/services/telemedicine" element={<Telemedicine />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/appointment/book" element={<BookAppointment />} />
              <Route path="/appointment/success" element={<AppointmentSuccess />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;