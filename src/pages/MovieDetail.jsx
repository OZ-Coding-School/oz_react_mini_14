import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks';
import { getMovieDetails } from '@/apis';
import { Indicator, Error } from '@/components';
import { IMAGE_BASE_URL } from '@/constants/url';

function MovieDetail() {
  const { id } = useParams();
  const fetchOptions = useMemo(() => ({ params: { id } }), [id]);
  const {
    data: movie,
    loading,
    error,
  } = useFetch({ api: getMovieDetails, options: fetchOptions });

  if (loading || !movie) return <Indicator />;
  if (error) return <Error message={error.message} />;
  return (
    <section className="relative flex grow">
      <div className="relative grow" aria-hidden>
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-800 to-black opacity-70"></div>
      </div>
      <div className="absolute inset-0 grid grid-cols-[repeat(2,1fr)] grid-rows-[2fr_1fr_3fr] gap-6 px-10 py-8 text-stone-50 sm:gap-10 md:gap-16 xl:grid-rows-[1fr_0.5fr_2fr] xl:gap-10">
        <p className="col-span-1 text-3xl font-bold break-keep md:text-4xl lg:text-5xl">
          {movie.title}
        </p>
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="col-span-1 row-span-2 size-full rounded-md bg-stone-950 object-contain xl:row-span-3"
        />
        <div className="col-span-1 row-span-1 flex flex-col justify-end font-bold md:text-lg lg:text-xl">
          <p className="">평점: ⭐ {movie.vote_average}</p>
          <p className="">
            장르: {movie.genres?.map((genre) => genre.name).join(', ')}
          </p>
        </div>
        <p className="col-span-2 row-span-1 break-keep whitespace-pre-wrap md:text-lg lg:text-xl xl:col-span-1">
          {movie.overview === '' ? '소개글이 없습니다.' : movie.overview}
        </p>
      </div>
    </section>
  );
}

export default MovieDetail;
