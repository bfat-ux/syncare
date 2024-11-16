const Button = ({ children, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 bg-primary text-white text-base font-normal hover:bg-opacity-90 hover:scale-105 rounded-full transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
