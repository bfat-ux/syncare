import HeroSection from '../components/common/HeroSection';
import Button from '../components/common/Button';

const Home = () => {
  return (
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
  );
};

export default Home;
