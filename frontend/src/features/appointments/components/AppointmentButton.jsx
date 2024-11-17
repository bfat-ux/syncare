import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/common/Button/Button';

const AppointmentButton = ({ 
  className = "", 
  variant = "primary",
  serviceType = "",
}) => {
  return (
    <Button 
      to="/appointment/book"
      variant={variant}
      className={`flex items-center justify-center gap-2 appointment-button ${className}`}
    >
      <CalendarDaysIcon className="w-5 h-5 text-current" />
      <span className="text-current">Book Appointment</span>
    </Button>
  );
};

export default AppointmentButton;