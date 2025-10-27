import { useRef } from 'react';
import MovieCard from '@/components/MovieCard';

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
      <button
        className="button absolute top-[50%] left-2 -translate-y-[50%] px-2 py-9 text-5xl text-stone-50 opacity-90"
        onClick={handleLeftClick}
      >
        &lt;
      </button>
      <button
        className="button absolute top-[50%] right-2 -translate-y-[50%] px-2 py-9 text-5xl text-stone-50 opacity-90"
        onClick={handleRightClick}
      >
        &gt;
      </button>
    </section>
  );
}

export default Carousel;
