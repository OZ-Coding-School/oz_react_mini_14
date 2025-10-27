import { IMAGE_BASE_URL } from '@/constants/url';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link to={`/details/${movie.id}`}>
      <article className="mx-auto w-50 shrink-0 grow-0 overflow-hidden rounded-md border border-stone-300 bg-stone-50 shadow-sm">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="mb-2 h-[300px] w-full bg-stone-200 object-contain"
        />
        <p className="mx-2 mb-2 overflow-hidden text-sm font-bold overflow-ellipsis whitespace-nowrap">
          {movie.title}
        </p>
        <p className="mb-2 ml-2 text-xs text-stone-600">
          평점: {movie.vote_average}
        </p>
      </article>
    </Link>
  );
}

export default MovieCard;
