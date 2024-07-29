import { createContext, useContext, useState, ReactNode, FC } from "react";

interface UserContextProps {
  user: boolean | null;
  setUser: (user: boolean | null) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

const MY_AUTH_APP = 'MY_AUTH_APP';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<boolean | null>(window.localStorage.getItem(MY_AUTH_APP) === 'true');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    console.log('useUserContext must be used within a UserProvider')
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
