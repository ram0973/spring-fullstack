import React, {PropsWithChildren, useMemo, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState({});

  const login = React.useCallback((data: object) => {
    setUser(data);
  }, [setUser]);

  const logout = React.useCallback(() => {
    setUser({});
  }, [setUser]);

  const value = useMemo(
    () => ({
      user: user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
