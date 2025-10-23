import { IMAGE_BASE_URL } from '@/constants/url';
import movie from '@/mocks/movieDetailData.json';

function MovieDetail() {
  return (
    <section className="relative h-screen w-full">
      <div className="relative size-full overflow-hidden" aria-hidden>
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 size-full bg-linear-to-b from-stone-800 to-black opacity-70"></div>
      </div>
      <div className="absolute inset-0 grid grid-cols-[3fr_2fr_100px] grid-rows-[100px_60px_2fr] gap-10 px-10 py-8 text-white">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="col-span-1 row-span-3 size-full rounded-md bg-stone-950 object-contain"
        />
        <p className="col-[2/3] flex items-center justify-start pt-6 text-4xl font-bold">
          {movie.title}
        </p>
        <p className="col-[3/4] flex items-center justify-start pt-6 text-lg font-bold">
          평점: {movie.vote_average}
        </p>
        <p className="col-span-2 font-bold">
          장르: {movie.genres.map((genre) => genre.name).join(', ')}
        </p>
        <p className="col-span-2 whitespace-pre-wrap">{movie.overview}</p>
      </div>
    </section>
  );
}

export default MovieDetail;
