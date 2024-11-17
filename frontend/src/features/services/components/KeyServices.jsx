import ServiceCard from './ServiceCard';
import { keyServices } from '../data/services';

const KeyServices = () => {
  return (
    <section className="w-full px-16 py-20 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-primary-DEFAULT">Services</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keyServices.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              centerText
              className="flex flex-col items-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyServices;
