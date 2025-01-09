export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: File | undefined | string;
  email: string;
  roles: string[];
  enabled: boolean
};
