import Button from '../common/Button/Button';
import secondSectionImage from '../../assets/images/secondsectionlanding.png';
import { useState } from 'react';

const ServicesSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full px-16 py-28 bg-background/25">
      <div className="max-w-[1440px] mx-auto flex flex-row items-center gap-20">
        {/* Left Content Column */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {/* Simplified title */}
            <h2 className="flex flex-col gap-2">
              <span className="text-secondary-DEFAULT text-5xl font-bold font-roboto leading-[57.60px]">
                Expert{' '}
                <span className="text-primary-DEFAULT">
                  Pediatric Care
                </span>
              </span>
            </h2>

            {/* Shorter description */}
            <p className="text-secondary-DEFAULT text-lg font-normal font-roboto leading-[27px]">
              Specialized care for your child's health and happiness, delivered by our expert pediatric team.
            </p>
          </div>

          <Button 
            to="/about" 
            variant="outline" 
            className="px-8 py-3 text-lg"
          >
            Learn More
          </Button>
        </div>

        {/* Right Image Column */}
        <div className="flex-1">
          <div className="aspect-[4/3] w-full relative rounded-l-3xl overflow-hidden shadow-2xl">
            {/* Loading placeholder */}
            <div 
              className={`absolute inset-0 bg-secondary-light/50 backdrop-blur-sm transition-opacity duration-300 ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            
            <img
              className={`w-full h-[640px] object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src={secondSectionImage}
              alt="Pediatric Services"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Optional: Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;