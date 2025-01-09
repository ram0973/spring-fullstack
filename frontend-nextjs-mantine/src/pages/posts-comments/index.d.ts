export type PostComment = {
  id: string;
  content: string;
  post: Post;
  enabled: boolean;
  user: User;
};
