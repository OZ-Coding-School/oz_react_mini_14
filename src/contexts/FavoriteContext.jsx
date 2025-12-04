// src/contexts/FavoriteContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [initialized, setInitialized] = useState(false); // 복원 완료 여부

  useEffect(() => {
    try {
      const storedIds = JSON.parse(localStorage.getItem("favoriteIds") || "[]");
      const storedMovies = JSON.parse(
        localStorage.getItem("favoriteMovies") || "[]",
      );

      if (Array.isArray(storedIds)) setFavoriteIds(storedIds);
      if (Array.isArray(storedMovies)) setFavoriteMovies(storedMovies);
    } catch (error) {
      console.error("즐겨찾기 복원 실패:", error);
    } finally {
      setInitialized(true); // 무조건 true로
    }
  }, []);

  useEffect(() => {
    if (!initialized) return; // 복원 끝나기 전에는 저장 안 함
    localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteIds, favoriteMovies, initialized]);

  const toggleFavorite = (movie) => {
    setFavoriteIds((prevIds) => {
      const exists = prevIds.includes(movie.id);

      if (exists) {
        setFavoriteMovies((prevMovies) =>
          prevMovies.filter((m) => m.id !== movie.id),
        );
        return prevIds.filter((id) => id !== movie.id);
      } else {
        setFavoriteMovies((prevMovies) => {
          if (prevMovies.some((m) => m.id === movie.id)) return prevMovies;
          return [...prevMovies, movie];
        });
        return [...prevIds, movie.id];
      }
    });
  };

  const value = {
    favoriteIds,
    favoriteMovies,
    toggleFavorite,
    initialized, // 여기 추가
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within FavoriteProvider");
  }
  return context;
}
