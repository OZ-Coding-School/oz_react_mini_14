import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from '@/router/router';
import { ThemeProvider, AuthProvider } from '@/contexts';
import { TOAST_DURATION } from '@/constants';
import '@/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
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
