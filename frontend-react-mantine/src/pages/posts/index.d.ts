export type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: File | undefined | string;
  excerpt: string;
  content: string;
  tags: string[];
  enabled: boolean;
};
