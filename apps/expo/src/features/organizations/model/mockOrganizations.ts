import { Organization } from '../../../entities/organization/types';

export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Orbital Materials Guild',
    focus: 'Space manufacturing',
    location: 'Remote-first',
    needs: ['Thermal analysis', 'Mission design', 'Seed partnerships'],
    contact: 'founders@omg.space',
  },
  {
    id: 'org-2',
    name: 'Biomechanics Collective',
    focus: 'Bio + robotics',
    location: 'Boston, MA',
    needs: ['Clinical partners', 'Grant reviewers', 'Hardware lead'],
    contact: 'collab@biocollective.ai',
  },
  {
    id: 'org-3',
    name: 'Frontier Climate Labs',
    focus: 'Extreme heat materials',
    location: 'Austin, TX',
    needs: ['Government liaisons', 'University PIs', 'Pilot sites'],
    contact: 'intake@fclabs.org',
  },
];
