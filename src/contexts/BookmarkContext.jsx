import { createContext, useContext } from "react";
import { useBookmarksLogic } from "@/hooks/useBookmarks";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const value = useBookmarksLogic();

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
