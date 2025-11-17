import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvide 안에서 사용해야 합니다");
  }
  return context;
};

export default useAuth;
