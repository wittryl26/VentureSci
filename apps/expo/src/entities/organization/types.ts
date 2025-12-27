export interface Organization {
  id: string;
  name: string;
  focus: string;
  location: string;
  needs: string[];
  contact: string;
  bookmarked?: boolean;
}
