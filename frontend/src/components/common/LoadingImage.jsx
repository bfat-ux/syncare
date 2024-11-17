import { useState } from 'react';
import PropTypes from 'prop-types';

const LoadingImage = ({ src, alt, className, aspectRatio = true, eager = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative ${aspectRatio ? 'aspect-[4/3]' : ''} w-full overflow-hidden ${className}`}>
      <div 
        className={`absolute inset-0 bg-secondary-light/50 backdrop-blur-sm transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      <img
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
    </div>
  );
};

LoadingImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  aspectRatio: PropTypes.bool,
  eager: PropTypes.bool
};

export default LoadingImage;