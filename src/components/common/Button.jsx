export default function Button({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition ${className}`}
    >
      {text}
    </button>
  );
}
