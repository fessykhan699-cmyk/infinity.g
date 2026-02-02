
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  results: {
    label: string;
    value: string;
    trend?: 'up' | 'down';
  }[];
  challenge: string;
  solution: string[];
  techStack: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  projectDescription: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}
