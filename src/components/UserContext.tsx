import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
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

  useEffect(() => {
    // Update session storage whenever the token changes
    if (token) {
      sessionStorage.setItem("jwt", token);
    } else {
      sessionStorage.removeItem("jwt");
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
  };

  const clearToken = () => {
    setTokenState(null);
  };

  return (
    <UserContext.Provider value={{ token, setToken, clearToken }}>
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
