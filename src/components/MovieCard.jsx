import { IMAGE_BASE_URL } from '@/constants/url';

function MovieCard({ movie }) {
  return (
    <article className="w-50 shrink-0 grow-0 overflow-hidden rounded-md border border-stone-300">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="mb-2 h-[300px] w-full bg-stone-200 object-contain"
      />
      <p className="mb-2 ml-2 text-sm font-bold">{movie.title}</p>
      <p className="mb-2 ml-2 text-xs text-stone-600">
        평점: {movie.vote_average}
      </p>
    </article>
  );
}

export default MovieCard;
