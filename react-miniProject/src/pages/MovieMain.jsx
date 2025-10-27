import MovieCard from "../Components/movie-card";
import MovieSwuper from "../Components/movie-swiper/MovieSwiper";
import MovieCardData from "../lib/MovieCardData";
import "./MovieMain.scss";

function MovieMain() {
  const movieData = MovieCardData();
  console.log(movieData);

  //맨처음 und -> falsy
  //0 === und => return null
  if (!movieData.length > 0) {
    return null;
  }

  return (
    <>
      <MovieSwuper movieData={movieData} />
      <div className="movieMain-Container">
        {movieData?.map((data) => (
          <MovieCard key={data.id} data={data} />
        ))}
      </div>
    </>
  );
}

export default MovieMain;

// const [movieData, setMoiveData] = useState([]); //movieListDatas.results
//   // console.log(API_URL + " / " + API_KEY);

//   useEffect(() => {
//     const fetchMovieInfo = async () => {
//       try {
//         const endPoint = `${API_URL}/popular?api_key=${API_KEY}&language=ko&page=1`;
//         const response = await fetch(endPoint);
//         const jsonData = await response.json();
//         const data = jsonData.results.filter((movie) => movie.adult === false);
//         if (data.length === 0) {
//           throw new Error("영화 데이터를 찾을 수 없습니다.");
//         }
//         // console.log(data);
//         setMoiveData(data);
//       } catch (error) {
//         console.error("API 요청 에러 : ", error);
//       }
//     };
//     fetchMovieInfo();
//   }, []);
