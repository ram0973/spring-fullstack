import React from "react";
import {authContext} from "./AuthContext.tsx";
import {AuthContextType} from "./AuthContextType";

export const useAuthContext = () => {
  const context = React.useContext<AuthContextType>(authContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
