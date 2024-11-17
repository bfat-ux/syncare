import { Link } from 'react-router-dom';

const Button = ({ children, to, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-block rounded-md font-medium transition-colors';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  return (
    <Link 
      to={to} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button;