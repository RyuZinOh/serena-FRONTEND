import React, {
  useState,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import useAuth from "./useAuth";
interface PfpContextType {
  profilePic: string | null;
  setProfilePic: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context
const PfpContext = createContext<PfpContextType | undefined>(undefined);

interface PfpProviderProps {
  children: ReactNode;
}

// PfpProvider component
const PfpProvider: React.FC<PfpProviderProps> = ({ children }) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/user/mypfp`, {
          headers: { Authorization: `${auth.token}` },
          responseType: "blob",
        })
        .then((response) => {
          setProfilePic(URL.createObjectURL(response.data));
        })
        .catch(() => {
          setProfilePic(null);
        });
    }
  }, [auth.token]);

  return (
    <PfpContext.Provider value={{ profilePic, setProfilePic }}>
      {children}
    </PfpContext.Provider>
  );
};

export default PfpProvider;
export { PfpContext }; 
