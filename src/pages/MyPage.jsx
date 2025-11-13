import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks';
import { TOAST_DURATION } from '@/constants';

function MyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('로그인이 필요한 페이지입니다.', {
        autoClose: TOAST_DURATION.error,
      });
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mx-10 my-15 lg:mx-20">
      <div className="flex gap-10">
        {user?.profileImgUrl ? (
          <img
            src={user.profileImgUrl}
            alt="유저의 프로필 이미지"
            className="size-30 rounded-full"
          />
        ) : (
          <div className="size-30 rounded-full border border-stone-500 bg-stone-200 object-cover object-center"></div>
        )}
        <div className="flex flex-col justify-start gap-2 pt-2 dark:text-stone-50">
          <p className="text-3xl font-bold">{user?.name}</p>
          <p className="">{user?.email}</p>
        </div>
      </div>
      <hr className="dark:stone-400 mt-6 border-t border-stone-950 dark:border-stone-200" />
      <h2 className="mt-6 text-3xl font-bold dark:text-stone-50">찜한 영화</h2>
    </section>
  );
}

export default MyPage;
