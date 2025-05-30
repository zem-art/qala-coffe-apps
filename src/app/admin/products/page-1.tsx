"use client";
import { api } from "~/trpc/react";
import React, { useState } from "react";
import TableSkeletonRow from "~/app/_components/skeleton";

// NOTE: this is code list data with server-side pagination

const PAGE_SIZE = 7;

export default function ListProduct() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = api.product.getProducts.useQuery(
    { page, pageSize: PAGE_SIZE },
    { keepPreviousData: true } // supaya UI stabil saat loading page baru
  );

  const title_header = ["no", "product", "category", "price", "stock", "action"];

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded border-black dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 h-15">
            <tr>
              {title_header.map((val, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 border-b dark:border-gray-700 text-left dark:text-background uppercase"
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <TableSkeletonRow key={i} cols={title_header.length} />
              ))
            ) : data?.items.length === 0 ? (
              <tr>
                <td
                  colSpan={title_header.length}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              data?.items.map((product, i) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">
                    {product.name}
                  </td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">
                    {product?.category?.name}
                  </td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">
                    Rp{product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background">
                    0
                  </td>
                  <td className="px-4 py-2 border-b dark:border-gray-700">
                    <button className="px-2 py-1 text-xs bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600">
                      Edit
                    </button>
                    <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
