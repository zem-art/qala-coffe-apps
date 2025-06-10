"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { useClientPagination } from '~/utils/hooks/useClientPaginationClientSide';
import { renderTableHeader } from '~/app/_components/table/table-header';
import { renderTableBodyDefault } from '~/app/_components/table/table-body';
import { IconRenderer } from '~/app/_components/IconRenderer';

export default function ListBokking() {
    const PAGE_SIZE = 7;
    const router = useRouter();
    const { data: bokking, isLoading } = api.bokking.getAll.useQuery();
    // const deleteProduct = api.product.delete.useMutation();
    const title_header = ["no", "name", "email", "phone", "action"];
    const { currentPage, setCurrentPage, maxPage, paginatedData } = useClientPagination(bokking || [], PAGE_SIZE);
    
    return (
      <div className="p-4">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">list bokking</h2>
          {/* <button
            className="p-2 rounded-sm bg-secondary hover:bg-accent cursor-pointer"
            onClick={() => router.push("/admin/products/new")}
          >
            <span className="text-black dark:text-background uppercase">add product</span>
          </button> */}
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
                      {dtx?.email}
                    </td>
                    <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background">
                      {dtx?.phone}
                    </td>
                    <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700">
                      <button onClick={() => router.push(`/admin/products/${dtx.id}`)} className="text-xs text-white rounded mr-2">
                        <IconRenderer
                          lib="fa"
                          name="FaPen"
                          size={20}
                          className="text-secondary hover:text-sky-700 dark:hover:text-sky-700 cursor-pointer"
                          />
                      </button>
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
