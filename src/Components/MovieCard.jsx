export default function MovieCard({ data }) {
  return (
    <div className="movieCard">
      <img
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        alt={`${data.title}`}
      />
      {data.title}
      {data.vote_average}
    </div>
  );
}
