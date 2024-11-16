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

const queryClient = new QueryClient();

function App() {
  return (
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
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;