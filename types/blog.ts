export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readMinutes: number;
  tags: string[];
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  image?: string;
  isLawDocument?: boolean;
  lawViewerPath?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
