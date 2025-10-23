const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({
  title,
  poster_path,
  vote_average,
  size = "md",
}) {
  const sizeClass = size === "sm" ? "w-40" : size === "md" ? "w-52" : "w-64";
  return (
    <>
      <div
        className={`${sizeClass} bg-white shadow-lg rounded-lg overflow-hidden
      cursor-pointer hover:scale-105 transition-transform`}
      />
      <img
        src={`${baseUrl}${poster_path}`}
        alt={title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h2 className="text-base font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-500">⭐ {vote_average}</p>
      </div>
    </>
  );
}
