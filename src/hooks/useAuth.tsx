import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { RespAD } from "@/interfaces/adinterface";

interface AuthContextType {
  user: RespAD|null;
  login: (data: RespAD) => Promise<void>;
  logout: () => void;
}



const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }:any) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data:any) => {
    setUser(data);
    navigate("/crear");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
