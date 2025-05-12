import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export type GoogleUser = {
  name: string;
  email: string;
  picture: string;
  [key: string]: any;
}

interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  googleUser: GoogleUser | null;
}

//Test
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    return sessionStorage.getItem("jwt") || null;
  });

  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(() => {
    return JSON.parse(sessionStorage.getItem("googleUser")) || null;
  });

  useEffect(() => {
    // Update session storage whenever the token changes
    if (token) {
      sessionStorage.setItem("jwt", token);
      const googleUser: GoogleUser = jwtDecode(token);
      sessionStorage.setItem("googleUser", JSON.stringify(googleUser));
    } else {
      sessionStorage.removeItem("jwt");
      sessionStorage.removeItem("googleUser");
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    setGoogleUser(jwtDecode(newToken));
  };

  const clearToken = () => {
    setTokenState(null);
    setGoogleUser(null);
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("googleUser");
  };

  return (
    <UserContext.Provider value={{ token, setToken, clearToken, googleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
