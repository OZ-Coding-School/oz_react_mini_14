import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./components/Layout";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<MovieDetail />} />
        <Route path="search" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}
