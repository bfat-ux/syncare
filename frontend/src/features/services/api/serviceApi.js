import { fhirClient } from '@/fhir/api/client';

export const getServices = async () => {
  return await fhirClient.search({
    resourceType: 'HealthcareService',
  });
};