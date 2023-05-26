import { createContext, FC, useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";

interface AuthContextType {
  token: string;
  login: (newToken: string) => void;
  logout: () => void;
  isAdminAuthenticated: boolean;
  userId: string
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  login: () => {},
  logout: () => {},
  isAdminAuthenticated: false,
  userId: ""
});

// @ts-ignore
const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("")
  const { data: session, status } = useSession();

  async function getUserId(name) {
    try {
      const response = await fetch(
        `https://sondeka-voting-api.cyclic.app/users/${encodeURIComponent(name)}`
      );

      const userId = await response.json();

      if (response.ok) {
        const id = userId?.id
        setUserId(id);
        // console.log("User ID: ", id)
      } else {
        console.error(userId.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
    const accessToken = window.localStorage.getItem('admin-token')
    setToken(accessToken)
    // console.log("Session: ", session)

    if(status === "authenticated"){
      getUserId(session?.user?.name)
    }
  }, [session])

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
    <AuthContext.Provider value={{ userId, token, login, logout, isAdminAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;