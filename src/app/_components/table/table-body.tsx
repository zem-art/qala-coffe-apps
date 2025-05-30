import React from "react";
import TableSkeletonRow from "~/app/_components/skeleton";

interface RenderBodyOptions<T> {
  isLoading: boolean;
  data: T[] | undefined;
  cols: number;
  renderRow: (item: T, index: number) => React.ReactNode;
  skeletonCount?: number;
}

export function renderTableBodyDefault<T>({
  isLoading,
  data,
  cols,
  renderRow,
  skeletonCount = 5,
}: RenderBodyOptions<T>) {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <TableSkeletonRow key={i} cols={cols} />
        ))}
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <tr>
        <td
          colSpan={cols}
          className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
        >
          No data found.
        </td>
      </tr>
    );
  }

  return <>{data.map(renderRow)}</>;
}
