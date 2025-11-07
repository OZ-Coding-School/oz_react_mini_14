import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeProvider from '@/contexts/ThemContext';
import MainLayout from '@/layouts/MainLayout';
import { App, MovieDetail, Search, SignUp } from '@/pages';
import '@/index.css';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="/details/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
);
