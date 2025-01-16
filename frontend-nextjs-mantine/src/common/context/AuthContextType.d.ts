export type AuthContextType = {
  user: User | null,
  isRedirected: boolean;
  setRedirect: () => void,
  clearRedirect: () => void,
  login: (data: object) => void,
  logout: () => void,
} | null;
