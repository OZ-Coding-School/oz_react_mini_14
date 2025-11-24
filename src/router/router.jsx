import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { App, LogIn, MovieDetail, MyPage, Search, SignUp } from '@/pages';
import { ProtectedRoute } from '@/components';

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: App },
      { path: '/details/:id', Component: MovieDetail },
      { path: '/search', Component: Search },
      { path: '/signup', Component: SignUp },
      { path: '/login', Component: LogIn },
      {
        path: '/my-page',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
