import { Button } from '@/components';

function ScrollButtons({ targetRef, scrollAmount }) {
  const handleLeftClick = () => {
    targetRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };
  const handleRightClick = () => {
    targetRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <>
      <Button
        type="button"
        variant="carousel"
        className="left-2"
        aria-label="왼쪽으로 스크롤"
        onClick={handleLeftClick}
      >
        &lt;
      </Button>
      <Button
        type="button"
        variant="carousel"
        className="right-2"
        aria-label="오른쪽으로 스크롤"
        onClick={handleRightClick}
      >
        &gt;
      </Button>
    </>
  );
}

export default ScrollButtons;
