const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <button
      {...props}
      className={`
        px-6 py-2 rounded-full font-medium transition-all duration-300
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:from-primary-light hover:to-primary' 
          : 'border-2 border-primary text-primary hover:bg-primary/5'
        }
        ${props.className || ''}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
