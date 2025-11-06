import { useRef } from 'react';
import { Button, MovieCard } from '@/components';

const SCROLL_AMOUNT = 500;

function Carousel({ movieList }) {
  const carouselRef = useRef(null);

  const handleLeftClick = () => {
    carouselRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };
  const handleRightClick = () => {
    carouselRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

  return (
    <section className="relative px-8">
      <div
        className="scroll-none flex gap-3 overflow-x-scroll py-8"
        ref={carouselRef}
      >
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Button
        type="button"
        variant="carousel"
        className="left-2"
        aria-label="영화 리스트 왼쪽으로 이동"
        onClick={handleLeftClick}
      >
        &lt;
      </Button>
      <Button
        type="button"
        variant="carousel"
        className="right-2"
        aria-label="영화 리스트 오른쪽으로 이동"
        onClick={handleRightClick}
      >
        &gt;
      </Button>
    </section>
  );
}

export default Carousel;
