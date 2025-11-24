import { createContext, useState, useEffect, useContext } from "react";
import { getItemFromLocalStorage } from "@utils";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = getItemFromLocalStorage("userInfo");

    if (saved && saved.user) {
      setUser(saved.user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
