import PropTypes from 'prop-types';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClasses[size]} border-4 border-primary/30 border-t-primary rounded-full animate-spin`}
      />
      {text && <p className="mt-2 text-secondary-DEFAULT/70">{text}</p>}
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string
};

export default Loading;