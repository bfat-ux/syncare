import PropTypes from 'prop-types';

const ServiceCard = ({ title, description, icon, className = "" }) => {
  return (
    <div className={`
      p-8 rounded-2xl bg-white 
      shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
      hover:shadow-[0_4px_25px_rgba(0,0,0,0.1)] 
      transition-all duration-300 
      hover:translate-y-[-4px]
      flex flex-col items-center text-center
      ${className}
    `}>
      {icon && (
        <div className="text-primary-DEFAULT mb-6 text-4xl">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold mb-3 text-secondary-DEFAULT">
        {title}
      </h3>
      <p className="text-secondary-DEFAULT/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node,
  className: PropTypes.string
};

export default ServiceCard;