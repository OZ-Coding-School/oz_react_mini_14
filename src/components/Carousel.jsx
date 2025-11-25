import { useRef } from 'react';
import { useFavoriteController } from '@/hooks';
import { MovieCard, ScrollButtons } from '@/components';

const SCROLL_AMOUNT = 500;

function Carousel({ movieList }) {
  const {
    isLoading,
    error,
    isFavoriteEnabled,
    favoriteMovieIds,
    onFavoriteClick,
  } = useFavoriteController();
  const carouselRef = useRef(null);

  if (isLoading) return <Indicator />;
  if (error) return <Error message={error.message} />;
  return (
    <section className="relative px-8">
      <div
        className="scroll-none flex gap-3 overflow-x-scroll py-8"
        ref={carouselRef}
      >
        {movieList.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavoriteEnabled={isFavoriteEnabled}
            isFavorite={favoriteMovieIds.has(movie.id)}
            onFavoriteClick={onFavoriteClick}
          />
        ))}
      </div>
      <ScrollButtons targetRef={carouselRef} scrollAmount={SCROLL_AMOUNT} />
    </section>
  );
}

export default Carousel;
