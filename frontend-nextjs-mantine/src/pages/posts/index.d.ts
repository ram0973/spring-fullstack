export type Post = {
  id: number;
  title: string;
  slug: string;
  //category: string;
  image: string;//File | undefined | string;
  excerpt: string;
  content: string;
  //tags: string[];
  enabled: boolean;
};
