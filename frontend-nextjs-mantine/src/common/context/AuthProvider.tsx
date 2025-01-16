import React, {PropsWithChildren, useMemo, useState} from "react";
import {authContext} from "./AuthContext.tsx";

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState({});
  const [isRedirected, setIsRedirected] = useState(false);

  const login = React.useCallback((data: object) => {
    setUser(data);
  }, [setUser]);

  const logout = React.useCallback(() => {
    setUser({});
  }, [setUser]);

  const setRedirect = React.useCallback(() => {
    setIsRedirected(true);
  }, [isRedirected]);

  const clearRedirect = React.useCallback(() => {
    setIsRedirected(false);
  }, [isRedirected]);

  const value = useMemo(
    () => ({
      user: user,
      isRedirected: isRedirected,
      login,
      logout,
      setRedirect,
      clearRedirect
    }),
    [login, logout, user, isRedirected, clearRedirect, setRedirect]
  );

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
}
