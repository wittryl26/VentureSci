import { Organization } from '../../../entities/organization/types';
import { requestApi } from '../../../shared/api/client';

export const fetchOrganizations = async (): Promise<Organization[]> => {
  return requestApi<Organization[]>('/organizations');
};
