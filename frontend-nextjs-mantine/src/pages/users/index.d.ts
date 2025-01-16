export type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: File | undefined | string;
  email: string;
  roles: string[];
  enabled: boolean
};
