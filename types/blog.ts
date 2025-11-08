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
  canonicalUrl?: string;
  lawFile?: string | string[];
  lawSlug?: string;
  lawMeta?: {
    citation?: string;
    publishedAt?: string;
    status?: 'neslužbeno' | 'službeno' | string;
  };
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
