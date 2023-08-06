export const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
      {Array(12)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="rounded-lg animate-pulse bg-gray-300 h-48 md:h-[356px]"
          />
        ))}
    </div>
  );
};
