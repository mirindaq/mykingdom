import { authApi } from "@/api/auth.api";
import { path } from "@/constants/path";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (user) => {
    const auth = await authApi.login(user);
    if (auth) {
      toast.success("Đăng nhập thành công");
      setUser(auth);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(auth));
      navigate(path.homepage);
    }
    else {
      toast.error("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  const register = async (user) => {
    const newUser = await authApi.register(user);
    if (newUser) {
      toast.success("Tài khoản đã được tạo");
      navigate(path.login);
    }
  };

  const logout = () => {
    setUser({});
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//3
export const useAuth = () => useContext(AuthContext);
