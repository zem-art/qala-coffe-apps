'use client';
import React, { useState } from 'react';
import MainLayout from '../layout';
import { useRouter } from 'next/navigation';
import ProductCard from '~/app/_components/qala/products';

type Product = {
  name: string;
  image: string;
  price: number;
  category: string;
};

const menuItems: Product[] = [
  { name: "Espresso", image: "https://placehold.co/300x200?text=Espresso", price: 25000, category: "Hot" },
  { name: "Iced Latte", image: "https://placehold.co/300x200?text=Iced+Latte", price: 28000, category: "Iced" },
  { name: "Cappuccino", image: "https://placehold.co/300x200?text=Cappuccino", price: 30000, category: "Hot" },
  { name: "Blended Mocha", image: "https://placehold.co/300x200?text=Blended+Mocha", price: 32000, category: "Blended" },
  { name: "Mocha", image: "https://placehold.co/300x200?text=Mocha", price: 32000, category: "Mocha" },
  { name: "Flat White", image: "https://placehold.co/300x200?text=Flat+White", price: 29000, category: "Hot" },
  { name: "Iced Americano", image: "https://placehold.co/300x200?text=Iced+Americano", price: 27000, category: "Iced" },
  { name: "Caramel Macchiato", image: "https://placehold.co/300x200?text=Caramel+Macchiato", price: 33000, category: "Hot" },
  { name: "Vanilla Latte", image: "https://placehold.co/300x200?text=Vanilla+Latte", price: 31000, category: "Hot" },
  { name: "Cold Brew", image: "https://placehold.co/300x200?text=Cold+Brew", price: 29000, category: "Iced" },
  { name: "Affogato", image: "https://placehold.co/300x200?text=Affogato", price: 34000, category: "Blended" },
  { name: "Hazelnut Latte", image: "https://placehold.co/300x200?text=Hazelnut+Latte", price: 31000, category: "Hot" },
];


const categories = ["All", "Hot", "Iced", "Blended"];

export default function ListMenu() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <MainLayout>
      <div className='flex flex-col items-center justify-start min-h-screen bg-white'>
        <div className='py-12 px-4 max-w-6xl mx-auto w-full'>
            {/* Filter Dropdown di pojok kanan atas */}
            <div className="flex justify-end mb-8">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-brown-600 text-brown-600 px-4 py-2 rounded-md text-sm md:text-base focus:outline-none"
                >
                    {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                    ))}
                </select>
            </div>


          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.name}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
