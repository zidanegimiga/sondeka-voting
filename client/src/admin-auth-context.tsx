import { createContext, FC, useState, useEffect } from "react";

interface AuthContextType {
  token: string;
  login: (newToken: string) => void;
  logout: () => void;
  isAdminAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  login: () => {},
  logout: () => {},
  isAdminAuthenticated: false,
});

// @ts-ignore
const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(()=>{
    const accessToken = window.localStorage.getItem('admin-token')
    setToken(accessToken)
  }, [])

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("admin-token", newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("admin-token");
  };

  const isAdminAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logout, isAdminAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;