import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import MovieDetail from "./details/MovieDetail.jsx";
import MovieMain from "./MovieMain.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieMain />} />
          <Route path="/details" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
