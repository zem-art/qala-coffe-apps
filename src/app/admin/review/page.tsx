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
    const title_header = ["No", "Nama Pelanggan", "Peran", "Penilaian", "Aksi"];

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
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Daftar Ulasan</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola ulasan dan penilaian pelanggan tentang layanan Anda.</p>
          </div>
          <div className="w-full md:w-72">
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari berdasarkan nama atau peran..."
            />
          </div>
        </div>
  
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
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
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                        {(currentPage - 1) * PAGE_SIZE + i + 1}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 font-medium text-gray-900 dark:text-white capitalize">
                        {dtx.name}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 text-gray-600 dark:text-gray-300 capitalize">
                        {dtx?.role}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <IconRenderer
                                    key={idx}
                                    lib="fa"
                                    name="FaStar"
                                    className={idx < (dtx?.rating || 0) ? "text-yellow-400" : "text-gray-200 dark:text-gray-700"}
                                    size={16}
                                />
                            ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                        <button 
                          // onClick={() => handleDeleteProduct(product.id || '')} 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Ulasan"
                        >
                          <IconRenderer
                            lib="fa"
                            name="FaTrash"
                            size={16}
                          />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
    
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Menampilkan halaman <span className="font-medium text-gray-900 dark:text-white">{currentPage}</span> dari <span className="font-medium text-gray-900 dark:text-white">{maxPage === 0 ? 1 : maxPage}</span>
              </p>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                  disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Sebelumnya</button>
                <button
                 className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                 disabled={currentPage === maxPage || maxPage === 0} onClick={() => setCurrentPage(p => p + 1)}>Selanjutnya</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
