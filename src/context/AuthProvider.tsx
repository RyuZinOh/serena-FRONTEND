import React, { useState, useEffect, createContext, ReactNode } from "react";

interface AuthState {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<
  [AuthState, React.Dispatch<React.SetStateAction<AuthState>>] | undefined
>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, token: null });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) setAuth(JSON.parse(storedAuth));
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
