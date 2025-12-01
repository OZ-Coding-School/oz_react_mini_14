import { useState, useEffect, useCallback } from "react";

export function useBookmarksLogic() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = useCallback((movie) => {
    setBookmarks((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  }, []);

  const removeBookmark = useCallback((id) => {
    setBookmarks((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const isBookmarked = useCallback(
    (id) => bookmarks.some((m) => m.id === id),
    [bookmarks]
  );

  return {
    bookmarks,
    toggleBookmark,
    removeBookmark,
    isBookmarked,
  };
}
