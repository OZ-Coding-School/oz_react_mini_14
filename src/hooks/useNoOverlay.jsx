import { useEffect } from "react";

export const useNoOverlay = () => {
  useEffect(() => {
    document.body.classList.add("no-overlay");

    return () => {
      document.body.classList.remove("no-overlay");
    };
  }, []);
};

export default useNoOverlay;
