
"use client";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { api } from "~/trpc/react";

export default function ListProduct() {
  const { data: products } = api.product.getProducts.useQuery()

  const title_header = [
    'no',
    'product',
    'category',
    'price',
    'stock',
    'action'
  ]

  const router = useRouter()
  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">list coffee</h2>
        <button className="p-2 rounded-sm bg-secondary hover:bg-accent cursor-pointer" onClick={() => router.push('/admin/products/add-product')}>
          <a className="text-black dark:text-background uppercase">add product</a>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded border-black dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 h-15">
            <tr>
              {title_header.map((val, idx) => (
                <th key={idx} className="px-4 py-2 border-b dark:border-gray-700 text-left dark:text-background uppercase">{val}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Contoh dummy data */}
            {products?.map((product, i) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background h-10">{i + 1}</td>
                <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background h-10">{product.name}</td>
                <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background h-10">{product?.category?.name}</td>
                <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background h-10">Rp{product.price.toLocaleString()}</td>
                <td className="px-4 py-4 border-b dark:border-gray-700 dark:text-background h-10">0</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">
                  <button className="px-2 py-1 text-xs bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
