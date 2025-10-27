import React, {useState} from "react";
import MovieCard from "./MovieCard";
import movieListData from '../movieListData.json';
import './MovieCard.css';

const Home = () => {
    const [movies] = useState(movieListData.results);

    return(
      <div style={{
        backgroundColor: '#141414', 
        minHeight: '100vh',
        width: '100vw',  /* 전체 뷰포트 너비 */
        padding: 0,
        margin: 0
      }}>
        <h2 style={{
          color: '#fff', 
          padding: '20px',
          margin: 0
        }}>인기순</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
        </div>
      </div>
    );
}

export default Home;