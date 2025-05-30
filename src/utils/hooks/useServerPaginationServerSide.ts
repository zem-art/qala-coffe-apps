import { useState, useEffect } from "react";

interface UseServerPaginationOptions<T> {
  fetcher: (page: number, limit: number) => Promise<T[]>;
  itemsPerPage?: number;
}

export function useServerPagination<T>({
  fetcher,
  itemsPerPage = 10,
}: UseServerPaginationOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetcher(currentPage, itemsPerPage)
      .then((res) => {
        setData(res);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, itemsPerPage, fetcher]);

  return {
    currentPage,
    setCurrentPage,
    data,
    isLoading,
  };
}
