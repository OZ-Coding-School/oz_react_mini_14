// 로컬 스토리지 사용 함수
export const setItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
  const stored = localStorage.getItem(key);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
