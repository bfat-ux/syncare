import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APPOINTMENT_ROUTES } from '../data/appointmentConfig';

export const useAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAppointmentClick = (type = 'modal') => {
    if (type === 'modal') {
      setIsModalOpen(true);
    } else {
      navigate(APPOINTMENT_ROUTES.BOOK);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    handleAppointmentClick,
  };
};