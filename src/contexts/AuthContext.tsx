import React, { Children, useContext, useEffect, useState } from "react";
import { auth, registerWithEmailAndPassword } from "../firebase";

interface AuthContextInterface {
  currentUser: any;
}
const AuthContext = React.createContext<Partial<AuthContextInterface>>({});

export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState();

  function signUp(email: string, password: string) {
    return registerWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextInterface = {
    currentUser: currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
