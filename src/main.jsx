import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '@/App.jsx';
import MovieDetail from '@/components/MovieDetail';
import '@/index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details" element={<MovieDetail />} />
    </Routes>
  </BrowserRouter>,
);
