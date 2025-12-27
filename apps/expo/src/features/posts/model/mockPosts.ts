import { Post } from '../../../entities/post/types';

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    title: 'Novel biomaterials for orbital manufacturing',
    summary: 'Seeking partners to validate printable composites in microgravity.',
    category: 'discovery',
    inquiries: 6,
  },
  {
    id: 'post-2',
    title: 'Grant-ready: hypersonic materials lab expansion',
    summary: 'Looking for matching funds and reviewers for climate-resilient alloys.',
    category: 'funding',
    inquiries: 4,
  },
  {
    id: 'post-3',
    title: 'University spinout recruiting founding engineer',
    summary: 'Radiation-hardened compute startup open to seed and research partnerships.',
    category: 'announcement',
    inquiries: 2,
  },
];
