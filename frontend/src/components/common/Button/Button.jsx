import { Link } from 'react-router-dom';

const Button = ({ children, to, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-block rounded-full font-medium transition-colors duration-300 px-6 py-2';
  const variants = {
    primary: 'bg-primary-DEFAULT hover:bg-primary-dark text-white [&_*]:text-white',
    secondary: 'bg-secondary-DEFAULT hover:bg-secondary-light text-white [&_*]:text-white',
    outline: 'border-2 border-secondary-DEFAULT hover:bg-secondary-DEFAULT text-secondary-DEFAULT hover:text-white [&_*]:text-secondary-DEFAULT hover:[&_*]:text-white',
    "outline-white": 'border-2 border-white hover:bg-white text-white hover:text-teal-700 [&_*]:text-white hover:[&_*]:text-teal-700',
    "outline-secondary": 'border-2 border-secondary-DEFAULT hover:bg-secondary-DEFAULT text-secondary-DEFAULT hover:text-white [&_*]:text-secondary-DEFAULT hover:[&_*]:text-white',
    navbar: 'bg-white hover:bg-primary-DEFAULT text-primary-DEFAULT hover:text-white [&_*]:text-primary-DEFAULT hover:[&_*]:text-white'
  };

  return (
    <Link 
      to={to || '/appointment/book'}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button;