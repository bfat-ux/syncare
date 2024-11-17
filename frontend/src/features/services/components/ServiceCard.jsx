import PropTypes from 'prop-types';

const ServiceCard = ({ title, description, icon, className = "", centerText = false }) => {
  return (
    <div className={`p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {icon && (
        <div className="text-primary-DEFAULT mb-4">
          {icon}
        </div>
      )}
      <h3 className={`text-xl font-bold mb-2 ${centerText ? 'text-center' : ''}`}>
        {title}
      </h3>
      <p className={`text-gray-600 ${centerText ? 'text-center' : ''}`}>
        {description}
      </p>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node,
  className: PropTypes.string,
  centerText: PropTypes.bool
};

export default ServiceCard;