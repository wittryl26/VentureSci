export type PostCategory = 'discovery' | 'funding' | 'announcement';

export interface Post {
  id: string;
  title: string;
  summary: string;
  saved?: boolean;
  category: PostCategory;
  inquiries: number;
}
