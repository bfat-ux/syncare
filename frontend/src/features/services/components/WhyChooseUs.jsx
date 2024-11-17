import ServiceCard from './ServiceCard';
import { whyChooseUs } from '../data/services';

const WhyChooseUs = () => {
  return (
    <section className="w-full px-16 py-20 bg-background/25">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-primary-DEFAULT">Kids' Care</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <ServiceCard 
              key={index}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
