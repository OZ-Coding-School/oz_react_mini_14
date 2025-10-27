import MovieCard from "./component/MovieCard";
import MovieDetail from "./component/MovieDetail";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './component/Home';
import Layout from './component/Layout';


const App = () => {

  return(
    <Routes>
      <Route  element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<MovieDetail/>} />
      </Route>
    </Routes>
  );
}

export default App;

