export const ReviewSkeleton = () => {
  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-sm animate-pulse bg-white">
      <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-4" />
      <div className="flex justify-center mb-2 space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
        ))}
      </div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2" />
      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-4" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
    </div>
  );
};
