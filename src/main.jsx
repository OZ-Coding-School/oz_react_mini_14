import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeProvider from '@/contexts/ThemContext';
import MainLayout from '@/layouts/MainLayout';
import App from '@/pages/App.jsx';
import MovieDetail from '@/pages/MovieDetail';
import Search from '@/pages/Search';
import '@/index.css';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="/details/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
);
