import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components';
import { IMAGE_BASE_URL } from '@/constants';

const MovieCard = memo(function ({
  movie,
  isFavoriteEnabled,
  isFavorite,
  onFavoriteClick,
}) {
  const { id, title, poster_path, vote_average } = movie;
  const posterImgUrl = `${IMAGE_BASE_URL}${poster_path}`;
  const voteAverage = parseFloat(vote_average.toFixed(2));

  const handleBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick({
      movieId: id,
      title,
      posterPath: posterImgUrl,
      voteAverage,
      isFavorite,
    });
  };

  return (
    <Link to={`/details/${id}`}>
      <article className="relative mx-auto w-40 shrink-0 grow-0 overflow-hidden rounded-md border border-stone-300 bg-stone-50 shadow-sm transition-all hover:scale-[102%] hover:border-stone-950 md:w-54 dark:border-stone-500 dark:bg-stone-500 hover:dark:border-stone-50">
        {isFavoriteEnabled && (
          <Button
            variant="icon"
            type="button"
            aria-label={isFavorite ? '영화 찜하기' : '영화 찜하기 해제'}
            onClick={handleBtnClick}
            className="absolute top-1 right-1"
          >
            {isFavorite ? '❤️' : '🩶'}
          </Button>
        )}
        <img
          src={posterImgUrl}
          alt={title}
          className="mb-2 h-[200px] w-full bg-stone-200 object-contain md:h-[300px] dark:bg-stone-600"
        />
        <p className="mx-2 mb-2 overflow-hidden text-sm font-bold overflow-ellipsis whitespace-nowrap dark:text-stone-50">
          {title}
        </p>
        <p className="mb-2 ml-2 text-xs text-stone-600 dark:text-stone-300">
          평점: {voteAverage}
        </p>
      </article>
    </Link>
  );
});

export default MovieCard;
