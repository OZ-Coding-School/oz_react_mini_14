import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks';
import { TOAST_DURATION } from '@/constants';

function ProtectedRoute({ children }) {
  const { userId } = useAuth();

  if (!userId) {
    toast.error('로그인이 필요한 페이지입니다.', {
      autoClose: TOAST_DURATION.error,
    });

    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
