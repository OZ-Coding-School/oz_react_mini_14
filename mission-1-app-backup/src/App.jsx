import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import MovieCard from "./components/MovieCards";
import MovieDetails from "./components/MovieDetails";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieCard />} />
          <Route path="/details" element={<MovieDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
