import HeroSection from "../components/HeroSection/HeroSection";
import ServiceOverview from '../features/services/components/ServiceOverview';
import KeyServices from '../features/services/components/KeyServices';
import WhyChooseUs from '../features/services/components/WhyChooseUs';
import Button from "../components/common/Button/Button";

const Home = () => {
  return (
    <main>
      <HeroSection>
        <Button 
          to="/appointment" 
          className="px-8 py-3 text-lg"
        >
          Book Appointment
        </Button>
        <Button 
          to="/about" 
          variant="outline" 
          className="px-8 py-3 text-lg"
        >
          Learn More
        </Button>
      </HeroSection>
      <ServiceOverview />
      <KeyServices />
      <WhyChooseUs />
    </main>
  );
};

export default Home;