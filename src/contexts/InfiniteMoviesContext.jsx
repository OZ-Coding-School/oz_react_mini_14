import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import { fetchPopularMovies } from "@/api/tmdb";

const InfiniteMoviesContext = createContext();

export function InfiniteMoviesProvider({ children }) {
  const moviesRef = useRef([]);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const isEndRef = useRef(false);
  const scrollRef = useRef(0);

  const [, forceUpdate] = useState({});

  const loadMovies = useCallback(async () => {
    if (loadingRef.current || isEndRef.current) return;

    loadingRef.current = true;

    const data = await fetchPopularMovies(pageRef.current);

    if (!data?.length) {
      isEndRef.current = true;
      loadingRef.current = false;
      forceUpdate({});
      return;
    }

    moviesRef.current = [...moviesRef.current, ...data];
    pageRef.current += 1;

    loadingRef.current = false;
    forceUpdate({});
  }, []);

  return (
    <InfiniteMoviesContext.Provider
      value={{
        movies: moviesRef.current,
        loadMovies,
        loading: loadingRef.current,
        isEnd: isEndRef.current,

        scrollY: scrollRef.current,
        saveScroll: (y) => (scrollRef.current = y),
      }}
    >
      {children}
    </InfiniteMoviesContext.Provider>
  );
}

export const useInfiniteMoviesStore = () => useContext(InfiniteMoviesContext);
