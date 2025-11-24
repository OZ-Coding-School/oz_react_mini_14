import { createContext, useContext, useState, useEffect } from "react";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  // localStorage에서 복원
  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // 저장
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (movie) => {
    setBookmarks((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((m) => m.id !== id));
  };

  const isBookmarked = (id) => bookmarks.some((m) => m.id === id);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
