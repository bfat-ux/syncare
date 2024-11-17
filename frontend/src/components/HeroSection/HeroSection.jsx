import { useState } from 'react';
import PropTypes from 'prop-types';
import LoadingImage from '../common/LoadingImage';
import AppointmentButton from '../../features/appointments/components/AppointmentButton';

const HeroSection = ({ children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-secondary-light to-secondary min-h-[75vh] flex flex-col lg:flex-row pt-[70px]">
      {/* Left Content Section */}
      <div className="w-full lg:w-1/2 flex items-center px-4 md:px-8 lg:px-16 py-12 lg:py-0 opacity-0 animate-slide-in-left" 
        style={{ animationDelay: '0.05s' }}
      >
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-6xl font-bold">
            <span className="block text-white/90">Welcome to</span>
            <div className="mt-2">
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Kids' Care
              </span>
            </div>
            <div className="mt-1">
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Children's Hospital
              </span>
            </div>
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            {children}
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full lg:w-1/2 flex items-center overflow-hidden opacity-0 animate-slide-in-right"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="aspect-[4/3] w-full relative rounded-l-3xl overflow-hidden shadow-2xl">
          <div 
            className={`absolute inset-0 bg-secondary-light/50 backdrop-blur-sm transition-opacity duration-300 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/src/assets/images/herosectionimg-mobile.webp"
              type="image/webp"
            />
            <source
              srcSet="/src/assets/images/herosectionimg.webp"
              type="image/webp"
            />
            <img
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src="/src/assets/images/herosectionimg.png"
              alt="Pediatric care"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-primary-light"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  children: PropTypes.node
};

export default HeroSection;