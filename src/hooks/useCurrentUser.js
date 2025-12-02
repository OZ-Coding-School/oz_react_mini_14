import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { getUserInfo } from '@/apis';

function useCurrentUser() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo({ params: { id: userId } }),
    enabled: !!userId,
    staleTime: Infinity,
  });
}

export default useCurrentUser;
