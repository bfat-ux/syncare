import { useQuery } from '@tanstack/react-query';
import { getServices } from '../api/serviceApi';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
};