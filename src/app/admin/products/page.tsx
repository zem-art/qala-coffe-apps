"use client";
import React from 'react';
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';
import { renderTableHeader } from "~/app/_components/table/table-header";
import { useClientPagination } from "~/utils/hooks/useClientPaginationClientSide";
import { renderTableBodyDefault } from "~/app/_components/table/table-body";
import formatCurrency from "~/utils/hooks/formatCurrency";
import { IconRenderer } from '~/app/_components/IconRenderer';

// NOTE: this is code list data with client-side pagination

export default function ListProduct() {
  const PAGE_SIZE = 7;
  const router = useRouter();
  const { data: products, isLoading } = api.product.getProducts.useQuery();
  const deleteProduct = api.product.delete.useMutation();
  const title_header = ["No", "Gambar", "Produk", "Kategori", "Harga", "Aksi"];
  const { currentPage, setCurrentPage, maxPage, paginatedData } = useClientPagination(products || [], PAGE_SIZE);

  const handleDeleteProduct = async (id:string) => {
    if(window.confirm('are you sure you want to delete')){
      if(!id) alert('id tidak ditemukan')
      await deleteProduct.mutateAsync({ id })
      window.location.reload()
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Daftar Produk</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola menu dan produk kafe Anda di sini.</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-xl shadow-sm hover:shadow-md hover:bg-main/90 transition-all cursor-pointer font-medium"
          onClick={() => router.push("/admin/products/new")}
        >
          <IconRenderer lib="fa" name="FaPlus" size={14} />
          <span>Tambah Produk</span>
        </button>
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
              renderRow: (product, i) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                    {(currentPage - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                    {product.imageUrl ? (
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-400">
                        <IconRenderer lib="fa" name="FaCoffee" size={20} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 capitalize">
                      {product?.category?.name || "Tanpa Kategori"}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                    {formatCurrency(product.price, "IDR")}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
                    <div className="flex gap-2">
                      <button onClick={() => router.push(`/admin/products/${product.id}`)} className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition-colors cursor-pointer" title="Edit Produk">
                        <IconRenderer lib="fa" name="FaPen" size={16} />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id || '')} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer" title="Hapus Produk">
                        <IconRenderer lib="fa" name="FaTrash" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Menampilkan halaman <span className="font-medium text-gray-900 dark:text-white">{currentPage}</span> dari <span className="font-medium text-gray-900 dark:text-white">{maxPage}</span>
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Sebelumnya</button>
            <button
             className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
             disabled={currentPage === maxPage} onClick={() => setCurrentPage(p => p + 1)}>Selanjutnya</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
