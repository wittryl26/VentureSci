export interface Profile {
  id: string;
  name: string;
  role: 'funder' | 'researcher' | 'builder';
  credibilityLinks: { label: string; url: string }[];
  verified: boolean;
}
