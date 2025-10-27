import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import App from '@/pages/App.jsx';
import MovieDetail from '@/pages/MovieDetail';
import '@/index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
