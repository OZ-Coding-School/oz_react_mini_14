function Error({ message }) {
  return (
    <div className="flex-center mt-40 gap-10 text-xl font-bold dark:text-stone-50">
      <p className="text-4xl">⚠️</p>
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
  );
}

export default Error;
