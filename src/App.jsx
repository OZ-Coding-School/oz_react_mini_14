import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
