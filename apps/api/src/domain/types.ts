export type CredibilityLink = {
  label: string;
  url: string;
};

export interface FunderRequest {
  id: string;
  funderName: string;
  projectId: string;
  amountRequested: number;
  message: string;
  status: 'pending' | 'approved' | 'declined';
  createdAt: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  principalInvestigator: string;
  summary: string;
  tags: string[];
  organizationId: string;
}

export interface Organization {
  id: string;
  name: string;
  focus: string;
  location: string;
  contact: string;
}

export interface Profile {
  id: string;
  email: string;
  credibility: CredibilityLink[];
}
