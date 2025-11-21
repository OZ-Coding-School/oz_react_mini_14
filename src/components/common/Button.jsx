export default function Button({ children, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      aria-label={typeof children === "string" ? children : "button"}
      className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition"
      {...props}
    >
      {children}
    </button>
  );
}
