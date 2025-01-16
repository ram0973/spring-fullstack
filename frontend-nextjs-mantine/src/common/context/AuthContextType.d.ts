export type AuthContextType = {
  user: User | null,
  login: (data: object) => void,
  logout: () => void,
} | null;
