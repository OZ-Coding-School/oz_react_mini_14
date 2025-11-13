import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const STORAGE_KEY = 'darkMode';

function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;

    setIsDarkMode(newIsDarkMode);
    localStorage.setItem(STORAGE_KEY, newIsDarkMode);
    document.documentElement.classList.toggle('dark', newIsDarkMode);
  };

  useEffect(() => {
    const darkMode = localStorage.getItem(STORAGE_KEY);

    if (darkMode !== null) {
      const parsedDarkMode = darkMode === 'true' ? true : false;

      setIsDarkMode(parsedDarkMode);
      document.documentElement.classList.toggle('dark', parsedDarkMode);
    }
  }, []);

  return (
    <ThemeContext value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext>
  );
}

export { ThemeContext };
export default ThemeProvider;
