import { createContext, FC, useState } from "react";

interface AuthContextType {
  token: string;
  login: (newToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// @ts-ignore
const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState("");

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("admin-token", newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("admin-token");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;