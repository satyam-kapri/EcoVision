import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [coins,setcoins]=useState(0);
  const signIn = (userData) => {
    // Logic to sign in the user
    setUser(userData);
  };

  const signOut = () => {
    // Logic to sign out the user
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut ,coins,setcoins}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
