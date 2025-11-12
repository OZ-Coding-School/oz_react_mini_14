import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { ThemeProvider, AuthProvider } from '@/contexts';
import MainLayout from '@/layouts/MainLayout';
import { App, LogIn, MovieDetail, Search, SignUp, SocialLogIn } from '@/pages';
import { TOAST_DURATION } from '@/constants';
import '@/index.css';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="/details/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/social-login" element={<SocialLogIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={TOAST_DURATION.default}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </ThemeProvider>
  </AuthProvider>,
);
