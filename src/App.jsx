import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieList />} />
        <Route path="detail/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
