export const APPOINTMENT_ROUTES = {
  BOOK: '/appointment/book',
  MANAGE: '/appointment/manage',
};

// Using the services from your existing data
import { keyServices } from '../../services/data/services';

export const appointmentServices = keyServices.map(service => ({
  id: service.title.toLowerCase().replace(/\s+/g, '-'),
  title: service.title,
  description: service.description
}));