import { useNavigate } from 'react-router-dom';
import './MovieCard.css';  // CSS import

const MovieCard = ({movie}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${movie.id}`);
  }

  return(
    <div className='movieCard-container' onClick={handleClick}>
      <p>
        <img 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
          alt={movie.title}
        />
      </p>
      <div>
        <p>{movie.title}</p>
        <p>⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MovieCard;



