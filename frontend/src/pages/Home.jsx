import HeroSection from "../components/HeroSection/HeroSection";
import ServiceOverview from '../features/services/components/ServiceOverview';
import KeyServices from '../features/services/components/KeyServices';
import WhyChooseUs from '../features/services/components/WhyChooseUs';
import AppointmentButton from '../features/appointments/components/AppointmentButton';
import CTASection from '../features/appointments/components/CTASection';
import Button from "../components/common/Button/Button";

const Home = () => {
  return (
    <main>
      {/* Teal gradient background */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700">
        <HeroSection>
          <AppointmentButton 
            type="modal"
            className="px-8 py-3 text-lg"
          />
          <Button 
            to="/about" 
            variant="outline-white" 
            className="px-8 py-3 text-lg"
          >
            Learn More
          </Button>
        </HeroSection>
      </div>
      
      {/* White background */}
      <div className="bg-white">
        <ServiceOverview />
      </div>
      
      {/* Teal gradient background */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700">
        <KeyServices />
      </div>
      
      {/* White background */}
      <div className="bg-white">
        <WhyChooseUs />
      </div>
      
      {/* Teal gradient background */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700">
        <CTASection />
      </div>
    </main>
  );
};

export default Home;