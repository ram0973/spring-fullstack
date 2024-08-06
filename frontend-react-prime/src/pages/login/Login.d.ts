export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  enabled: boolean;
  author: string
  dateCreated: Date;
}

export interface ArticleCreateRequestDto {
  title: string,
  slug: string,
  image?: File | null,
  excerpt: string,
  content: string,
  enabled: boolean,
}
