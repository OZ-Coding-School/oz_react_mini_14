import { useDispatch } from "react-redux";
import _ from "lodash"; //debounce 사용 관련 // 전체 라이브러리 불러오기
import { useCallback, useState } from "react";
import { setSearchText } from "@store/slice";

export const useSearchHandler = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      dispatch(setSearchText(query));
    }, 400),
    [dispatch]
  );

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInputValue(value);
      debouncedSearch(value); // debounce 함수 호출
    },
    [debouncedSearch]
  );

  const resetSearch = () => {
    setInputValue("");
    debouncedSearch("");
  };

  return { inputValue, handleInputChange, resetSearch };
};
