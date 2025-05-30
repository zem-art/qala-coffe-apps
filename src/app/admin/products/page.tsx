"use client";
import React from 'react';
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';
import { renderTableHeader } from "~/app/_components/table/table-header";
import { useClientPagination } from "~/utils/hooks/useClientPaginationClientSide";
import { renderTableBodyDefault } from "~/app/_components/table/table-body";
import formatCurrency from "~/utils/hooks/formatCurrency";

// NOTE: this is code list data with client-side pagination

export default function ListProduct() {
  const PAGE_SIZE = 7;
  const router = useRouter();
  const { data: products, isLoading } = api.product.getProducts.useQuery();
  const deleteProduct = api.product.delete.useMutation();
  const title_header = ["no", "product", "category", "price", "action"];
  const { currentPage, setCurrentPage, maxPage, paginatedData } = useClientPagination(products || [], PAGE_SIZE);

  const handleDeleteProduct = async (id:string) => {
    if(window.confirm('are you sure you want to delete')){
      if(!id) alert('id tidak ditemukan')
      await deleteProduct.mutateAsync({ id })
      window.location.reload()
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">list coffee</h2>
        <button
          className="p-2 rounded-sm bg-secondary hover:bg-accent cursor-pointer"
          onClick={() => router.push("/admin/products/new")}
        >
          <span className="text-black dark:text-background uppercase">add product</span>
        </button>
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
              renderRow: (product, i) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background">
                    {(currentPage - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background uppercase">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background capitalize">
                    {product?.category?.name}
                  </td>
                  <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700 dark:text-background">
                    {formatCurrency(product.price, "IDR")}
                  </td>
                  <td className="px-4 py-3 border-b border-b-accent dark:border-gray-700">
                    <button onClick={() => router.push(`/admin/products/${product.id}`)} className="px-2 py-1 text-xs bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600 cursor-pointer">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id || '')} className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
                      Delete
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
