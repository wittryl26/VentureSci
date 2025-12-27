import { CredibilityLink, FunderRequest, Organization, Profile, ResearchProject } from '../domain/types';

const now = () => new Date().toISOString();

export class DataStore {
  private funderRequests: FunderRequest[] = [
    {
      id: 'req-1',
      funderName: 'Frontier Fund',
      projectId: 'proj-1',
      amountRequested: 100000,
      message: 'Seeking matching grant for hypersonic materials validation.',
      status: 'pending',
      createdAt: now(),
    },
  ];

  private projects: ResearchProject[] = [
    {
      id: 'proj-1',
      title: 'Microgravity composites',
      principalInvestigator: 'Dr. Lee',
      summary: 'Testing printable composites for orbital manufacturing.',
      tags: ['space', 'materials'],
      organizationId: 'org-1',
    },
  ];

  private organizations: Organization[] = [
    {
      id: 'org-1',
      name: 'Orbital Materials Guild',
      focus: 'Space manufacturing',
      location: 'Remote',
      contact: 'founders@omg.space',
      needs: ['Thermal analysis', 'Mission design', 'Seed partnerships'],
    },
  ];

  private profiles: Profile[] = [
    {
      id: 'profile-1',
      email: 'researcher@venturesci.io',
      credibility: [
        { label: 'Google Scholar', url: 'https://scholar.google.com/venturesci' },
        { label: 'GitHub', url: 'https://github.com/venturesci' },
      ],
    },
  ];

  upsertFunderRequest(payload: Omit<FunderRequest, 'id' | 'createdAt' | 'status'>): FunderRequest {
    const request: FunderRequest = {
      ...payload,
      id: `req-${Date.now()}`,
      createdAt: now(),
      status: 'pending',
    };
    this.funderRequests.push(request);
    return request;
  }

  listFunderRequests(): FunderRequest[] {
    return this.funderRequests;
  }

  listProjects(): ResearchProject[] {
    return this.projects;
  }

  addProject(project: Omit<ResearchProject, 'id'>): ResearchProject {
    const entry: ResearchProject = { ...project, id: `proj-${Date.now()}` };
    this.projects.push(entry);
    return entry;
  }

  listOrganizations(): Organization[] {
    return this.organizations;
  }

  getOrganization(id: string): Organization | undefined {
    return this.organizations.find((org) => org.id === id);
  }

  upsertProfile(profile: Profile): Profile {
    const existing = this.profiles.find((item) => item.id === profile.id);
    if (existing) {
      Object.assign(existing, profile);
      return existing;
    }
    this.profiles.push(profile);
    return profile;
  }

  listProfiles(): Profile[] {
    return this.profiles;
  }

  addCredibilityLink(profileId: string, link: CredibilityLink): Profile | undefined {
    const profile = this.profiles.find((p) => p.id === profileId);
    if (profile) {
      profile.credibility.push(link);
    }
    return profile;
  }
}

export const memoryStore = new DataStore();
