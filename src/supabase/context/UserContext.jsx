import { createContext, useState, useEffect } from "react";
import { getItemFromLocalStorage } from "../utilities";

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
