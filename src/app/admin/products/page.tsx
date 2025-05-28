
"use client";
import React, { useState } from 'react';
import { api } from "~/trpc/react";

export default function AdminMenuPage() {
    const utils = api.useUtils();
//   const createProduct = api.product.create.useMutation({
//     onSuccess: () => {
//       utils.invalidate();
//       alert("Product created!");
//     },
//   });

  // const { data: categories } = api.product.getCategories.useQuery();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "", // ⬅️ new
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const categories = [
    { id : 1, name : "late"},
    { id : 2, name : "americano"},
    { id : 3, name : "capuchino"},
    { id : 4, name : "choco"},
  ]

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     createProduct.mutate({
//       name: form.name,
//       description: form.description,
//       price: parseFloat(form.price),
//       imageUrl: form.imageUrl,
//       categoryId: parseInt(form.categoryId),
//     });
//   };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 dark:text-background">Add Coffee</h2>
      <form 
        // onSubmit={handleSubmit} 
        className="space-y-4 text-sm">
        <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
        />
        <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
            type="number"
            step="0.01"
        />
        {/* <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        /> */}
        <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />

        {/* Dropdown Category */}
        <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
        >
            <option value="" disabled>Select Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                  {cat.name?.toUpperCase()}
              </option>
            ))}
        </select>

        <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded hover:bg-accent transition disabled:opacity-50 cursor-pointer"
        >
            Save Product
        </button>
        </form>
    </div>
  );
}
