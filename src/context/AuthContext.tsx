import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from 'universal-cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const cookieValue = cookies.get('isLoggedIn');
    return cookieValue === 'true';
  });

  useEffect(() => {
    cookies.set('isLoggedIn', isLoggedIn.toString(), { path: '/' });
    console.log("Estado de isLoggedIn ha cambiado:", isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
    cookies.set('isLoggedIn', 'true', { path: '/' });
  };

  const logout = () => {
    setIsLoggedIn(false);
    cookies.set('isLoggedIn', 'false', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
