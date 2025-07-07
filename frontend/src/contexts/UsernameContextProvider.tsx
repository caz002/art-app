import React, { createContext, useContext, useState } from 'react';

interface UsernameContextType {
  username: string;
  setUsername: (id: string) => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(undefined);

export const UsernameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  return (
    <UsernameContext.Provider value={{ username, setUsername}}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsernameContext = () => {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error('useContext must be used within a Provider');
  }
  return context;
};