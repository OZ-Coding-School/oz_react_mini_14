import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Layout from "@pages/Layout";
import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import DetailPage from "@pages/DetailPage";
import SearchPage from "@pages/SearchPage";
import SignupPage from "@pages/SignupPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/movie/:id" element={<DetailPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
