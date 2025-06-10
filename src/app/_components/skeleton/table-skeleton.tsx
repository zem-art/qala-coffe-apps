export default function TableSkeletonRow({ cols = 6 }: { cols?: number }) {
    return (
      <tr className="animate-pulse">
        {Array.from({ length: cols }).map((_, j) => (
          <td key={j} className="px-4 py-4 border-b dark:border-gray-700">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          </td>
        ))}
      </tr>
    );
  }
  