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
        className={`${sizeClass} bg-white shadow-md hover:shadow-xl rounded-lg
        overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300`}
      >
        <div className="w-full aspect-[2/3]">
          <img
            src={poster_path ? `${baseUrl}${poster_path}` : "/placeholder.png"}
            alt={title}
            className="w-full h-72 object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between h-28">
          <h2 className="text-base font-semibold mb-1">{title}</h2>
          <p className="text-sm text-gray-500">⭐ {vote_average}</p>
        </div>
      </div>
    </>
  );
}
