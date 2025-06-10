'use client';
import React from 'react';
import { api } from '~/trpc/react';
import { useParams, useRouter } from 'next/navigation';
import formatCurrency from '~/utils/hooks/formatCurrency';

export default function DetailMenu() {
    const params = useParams();
    const router = useRouter();
    const productId = params?.id as string;

    type Product = {
        name?: string;
        description?: string | null;
        price?: string | number;
        imageUrl?: string | null;
        [key: string]: any;
    };

    const { data: getProductById, isLoading } = api.product.getById.useQuery(
        { id: String(productId) }
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen mt-8">
            <div className="min-h-screen bg-white flex flex-col items-center p-8">
                <h1 className="text-3xl font-bold mb-6">Detail Produk</h1>

                <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 bg-gray-100 p-6 rounded-lg shadow">
                    {/* Gambar Produk */}
                    <div className="md:w-1/2">
                        {isLoading ? (
                            <div className="w-[400px] h-[400px] bg-gray-300 animate-pulse rounded-lg" />
                        ) : (
                            <img
                                src={`https://placehold.co/600x600?text=${getProductById?.name || "Nama Produk"}`}
                                alt={getProductById?.name || "Nama Produk"}
                                className="w-full rounded-lg object-cover"
                            />
                        )}
                    </div>

                    {/* Info Produk */}
                    <div className="md:w-1/2 flex flex-col justify-between">
                        {isLoading ? (
                            <>
                                <div className="space-y-4">
                                    <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded" />
                                    <div className="w-full h-16 bg-gray-300 animate-pulse rounded" />
                                    <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded" />
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <div className="w-1/2 h-10 bg-gray-300 animate-pulse rounded" />
                                    <div className="w-1/2 h-10 bg-gray-300 animate-pulse rounded" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">{getProductById?.name}</h2>
                                    <p className="text-gray-700 mb-4">{getProductById?.description}</p>
                                    <p className="text-lg font-bold text-brown-700 mb-4">
                                        {getProductById?.price
                                            ? formatCurrency(String(getProductById.price)).replace("IDR", "Rp.")
                                            : "Rp.0"}
                                    </p>
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
                                        Masukkan ke Keranjang
                                    </button>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <a href="/menu/list" className="text-blue-600 hover:underline">
                        ← Kembali ke Menu
                    </a>
                </div>
            </div>
        </div>
    );
}
