import { useEffect, useRef, useState } from 'react';

function useDebounce({ text, delay }) {
  const [debouncedText, setDebouncedText] = useState('');
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
      timeoutIdRef.current = null;
    }, delay);
    timeoutIdRef.current = timeoutId;
  }, [text, delay]);

  return debouncedText;
}

export default useDebounce;
