import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import {
  Home,
  MovieDetail,
  SearchResults,
  LoginPage,
  SignupPage,
} from "@pages";
import Layout from "@components/Layout";

import { useSupabaseAuth } from "@supabase";
import { UserContext } from "@context/UserContext";

import OAuthCallback from "@components/OAuthCallback";

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

      <Route path="/oauth-callback" element={<OAuthCallback />} />
    </Routes>
  );
}
