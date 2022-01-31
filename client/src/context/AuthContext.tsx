import React from "react";
import { createContext, useState } from "react";

interface Props {
  chiildren: React.ReactNode;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export const AuthContext = createContext<{
  user: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}>({ user: null });

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
