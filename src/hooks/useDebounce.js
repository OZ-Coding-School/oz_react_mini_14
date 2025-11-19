// src/hooks/useDebounce.js
import { useState, useEffect } from "react";

// useDebounce 커스텀 훅
// value: 지연시킬 값
// delay: 지연 시간 (밀리초)
export const useDebounce = (value, delay) => {
  // debounce된 값을 저장할 state(스테이트)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
