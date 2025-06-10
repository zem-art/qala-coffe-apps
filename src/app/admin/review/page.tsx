"use client"
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { useClientPagination } from '~/utils/hooks/useClientPaginationClientSide';
import { renderTableHeader } from '~/app/_components/table/table-header';
import { renderTableBodyDefault } from '~/app/_components/table/table-body';
import { IconRenderer } from '~/app/_components/IconRenderer';
import SearchInput from '~/app/_components/ui/SearchInput';

export default function ListReview() {
    const PAGE_SIZE = 10;
    const router = useRouter();
    const { data: review, isLoading } = api.review.getAll.useQuery();
    const [search, setSearch] = useState<string>("");
    const title_header = ["no", "name", "role", "rating", "action"];

    const filteredData = useMemo(() => {
        if (!review) return [];
        const keyword = search.toLowerCase();
        return review.filter(
        (item) =>
            item.name?.toLowerCase().includes(keyword) ||
            item.role?.toLowerCase().includes(keyword)
        );
    }, [review, search]);
    
    const { currentPage, setCurrentPage, maxPage, paginatedData } = useClientPagination(filteredData || [], PAGE_SIZE);

    return (
      <div className="p-4">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">list review</h2>
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Name or Role"
            />
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full border border-accent dark:border-gray-700 text-sm">
            {renderTableHeader(title_header)}
            <tbody>
              {renderTableBodyDefault({
                isLoading,
                data: paginatedData,
                cols: title_header.length,
                skeletonCount: PAGE_SIZE,
                renderRow: (dtx, i) => (
                  <tr
                    key={dtx.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background">
                      {(currentPage - 1) * PAGE_SIZE + i + 1}
                    </td>
                    <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background uppercase">
                      {dtx.name}
                    </td>
                    <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background">
                      {dtx?.role}
                    </td>
                    <td className="flex px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background">
                        {Array.from({ length: dtx?.rating || 0 }).map((_, i) => (
                            <IconRenderer
                            key={i}
                            lib="fa"
                            name="FaStar"
                            className="dark:text-yellow-300 text-yellow-800 ml-2"
                            size={25}
                            />
                        ))}
                    </td>
                    <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700">
                      {/* <button onClick={() => router.push(`/admin/products/${dtx.id}`)} className="text-xs text-white rounded mr-2">
                        <IconRenderer
                          lib="fa"
                          name="FaPen"
                          size={20}
                          className="text-secondary hover:text-sky-700 dark:hover:text-sky-700 cursor-pointer"
                          />
                      </button> */}
                      <button 
                        // onClick={() => handleDeleteProduct(product.id || '')} 
                        className="text-xs text-white rounded">
                        <IconRenderer
                          lib="fa"
                          name="FaTrash"
                          size={20}
                          className="text-red-400 hover:text-red-700 dark:hover:text-red-700 cursor-pointer"
                          />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
  
          {/* Pagination */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1 border dark:border-background dark:text-background rounded disabled:opacity-50 cursor-pointer"
              disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
            <span className="px-3 py-1 dark:text-background">{currentPage} / {maxPage}</span>
            <button
             className="px-3 py-1 border dark:border-background dark:text-background rounded disabled:opacity-50 cursor-pointer"
             disabled={currentPage === maxPage} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    );
}
