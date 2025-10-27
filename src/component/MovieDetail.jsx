import './MovieDetail.css';
import movieDetailData from '../movieDetailData.json';
import { useNavigate } from 'react-router-dom';


const MovieDetail = () => {
  const navigate = useNavigate();

 
  
  return(
    <>
    <div className='movieDetail-container'>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <img src={`https://image.tmdb.org/t/p/w500/${movieDetailData.poster_path}`} />
      <div>
      <p>제목 : {movieDetailData.title} </p>
      <p>평점 : {movieDetailData.vote_average}</p>
      <p>장르 : {movieDetailData.genres.map((genre) => genre.name).join(', ')}</p>
      </div>
    </div>
    </>
  );
}

export default MovieDetail;