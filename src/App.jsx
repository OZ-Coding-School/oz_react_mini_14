import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./components/Layout";
import SearchResults from "./pages/SearchResults";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useSupabaseAuth } from "./supabase";
import { UserContext } from "./supabase/context/UserContext";

export default function App() {
  const { getUserInfo } = useSupabaseAuth();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const initUser = async () => {
      const userInfo = await getUserInfo();
      if (userInfo && userInfo.user) {
        setUser(userInfo.user);
      }
    };
    initUser();
  }, [getUserInfo, setUser]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<MovieDetail />} />
        <Route path="search" element={<SearchResults />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
