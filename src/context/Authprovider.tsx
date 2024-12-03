import React, { useState, useEffect, createContext, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: number;
}

interface AuthState {
  user: User | null;
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
    try {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth?.user && parsedAuth?.token) {
          setAuth(parsedAuth);
        }
      }
    } catch (error) {
      console.error("Error loading auth from localStorage", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // Default export
export { AuthContext }; // Named export
