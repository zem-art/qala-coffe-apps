'use client';
import React, { useMemo, useState } from 'react';
import MainLayout from '../layout';
import { useRouter } from 'next/navigation';
import ProductCard from '~/app/_components/qala/products';
import { api } from '~/trpc/react';
import formatCurrency from '~/utils/hooks/formatCurrency';

export default function ListMenu() {
    const router = useRouter();
    const { data: categories } = api.category.getCategories.useQuery();
    const { data : menuItems, isLoading } = api.product.getProducts.useQuery();
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const filteredItems = useMemo(() => {
        if (!menuItems) return [];

        return selectedCategory && selectedCategory !== "All"
            ? menuItems.filter((item) => item.category?.name?.toLowerCase() === selectedCategory.toLowerCase())
            : menuItems;
        }, [menuItems, selectedCategory]);

    return (
        <MainLayout>
            <div className='flex flex-col items-center justify-start min-h-screen bg-white'>
                <h1 className="text-4xl font-bold text-center text-main mb-3 uppercase mt-8">
                    our menu{" "}
                    <span className="block text-main text-2xl font-normal mt-2">
                        Explore our delicious offerings
                    </span>
                </h1>

                <div className='py-12 px-4 max-w-6xl mx-auto w-full'>
                    {/* Filter Dropdown di pojok kanan atas */}
                    <div className="flex justify-end mb-8">
                        {/* <label className='text-brown-600 text-sm md:text:base mr-3 mt-2'>Filter by Category:</label> */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-brown-600 text-brown-600 px-4 py-2 rounded-md text-sm md:text-base focus:outline-none"
                        >
                            <option value="" disabled>Select Category</option>
                            {categories?.map((dtx) => (
                                <option key={dtx.id} value={dtx.name}>
                                    {dtx?.name?.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        {
                            selectedCategory && (
                                <button 
                                    onClick={() => setSelectedCategory("")}
                                    className='flex items-center ml-4 px-3 py-2 bg-red-500 text-white rounded cursor-pointer'
                                    >
                                    <span className="ml-2 text-sm md:text-base">Clear Filter</span>
                                </button>
                            )
                        }
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="animate-pulse space-y-4 w-70">
                                    <div className="h-48 bg-gray-300 rounded-md" />
                                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                                </div>
                            ))
                            : filteredItems &&
                                filteredItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => router.push('/menu/detail/' + item.id)}
                                    >
                                    <ProductCard
                                        name={item.name}
                                        image={item.imageUrl || `https://placehold.co/300x200?text=${item.name}`}
                                        category={item?.category?.name}
                                        price={
                                            item?.price
                                                ? formatCurrency(item?.price)?.replace('IDR', 'Rp.')
                                                : '0'
                                        }
                                    />
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
