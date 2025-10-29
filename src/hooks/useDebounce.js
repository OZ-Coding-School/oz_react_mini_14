import { useState, useEffect } from "react";

// useDebounce 커스텀 훅
// value: 지연시킬 값
// delay: 지연 시간 (밀리초)
export const useDebounce = (value, delay) => {
  // debounce된 값을 저장할 state
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 시간 후에 debouncedValue를 업데이트하는 타이머 설정
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // value나 delay가 변경되면 이전 타이머를 취소
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  // debounce된 값 반환
  return debouncedValue;
};
