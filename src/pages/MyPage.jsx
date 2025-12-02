import { useCurrentUser, useFavoriteController } from '@/hooks';
import { Error, Indicator, MovieList } from '@/components';

function MyPage() {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useCurrentUser();
  const {
    favoriteMovies,
    isLoading: isMovieLoading,
    error: movieError,
  } = useFavoriteController();

  if (isUserLoading || isMovieLoading) return <Indicator />;
  if (userError || movieError)
    return <Error message={userError?.message ?? movieError?.message} />;
  return (
    <section className="mx-10 my-15 lg:mx-20">
      <div className="flex gap-10">
        <img
          src={user.profileImgUrl}
          alt="유저의 프로필 이미지"
          className="size-30 rounded-full"
        />
        <div className="flex flex-col justify-start gap-2 pt-2 dark:text-stone-50">
          <p className="text-3xl font-bold">{user.name}</p>
          <p className="">{user.email}</p>
        </div>
      </div>
      <hr className="dark:stone-400 mt-6 border-t border-stone-950 dark:border-stone-200" />
      <h2 className="mt-6 text-3xl font-bold dark:text-stone-50">찜한 영화</h2>
      <MovieList movieList={favoriteMovies} />
    </section>
  );
}

export default MyPage;
