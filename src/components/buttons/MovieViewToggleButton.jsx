import { Button } from '@/components';

function MovieViewToggleButton({ isCarousel, onToggle }) {
  return (
    <Button
      type="button"
      variant="stone"
      size="xl"
      className="mt-10 ml-22"
      onClick={onToggle}
    >
      {isCarousel ? 'View List' : 'View Carousel'}
    </Button>
  );
}

export default MovieViewToggleButton;
