import { 
  UserIcon,
  HeartIcon,
  ClockIcon,
  BeakerIcon,
  AcademicCapIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import ServiceCard from './ServiceCard';
import Button from '../../../components/common/Button/Button';

const KeyServices = () => {
  const services = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "General Pediatrics",
      description: "Comprehensive healthcare for children from birth through adolescence."
    },
    {
      icon: <UserIcon className="w-8 h-8" />,
      title: "Newborn Care & Immunization",
      description: "Complete vaccination programs and specialized newborn care services."
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Special Consultations",
      description: "Expert consultations for complex pediatric conditions."
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "24/7 Emergency Care",
      description: "Round-the-clock pediatric emergency services."
    },
    {
      icon: <BeakerIcon className="w-8 h-8" />,
      title: "Genetic Counseling",
      description: "Professional guidance for genetic conditions and family planning."
    },
    {
      icon: <AcademicCapIcon className="w-8 h-8" />,
      title: "School Health",
      description: "Comprehensive health support for school-age children."
    }
  ];

  return (
    <section className="w-full px-8 md:px-16 py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Medical <span className="text-primary-light">Services</span>
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Comprehensive pediatric care services delivered by our expert team in a 
            child-friendly environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className="h-full bg-white"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            to="/services" 
            variant="outline-white"
            className="px-8 py-3"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KeyServices;
