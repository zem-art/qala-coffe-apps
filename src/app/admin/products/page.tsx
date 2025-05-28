
"use client";
import React, { useState } from 'react';
import { api } from "~/trpc/react";

export default function AdminMenuPage() {
  const utils = api.useUtils();
  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      utils.invalidate();
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },
  });

  const { data: categories } = api.product.getCategories.useQuery();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct.mutate({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      imageUrl: form.imageUrl,
      categoryId: parseInt(form.categoryId),
    });
  };

  return (
    <div className="">
      <div className='flex items-center justify-between pb-4'>
        <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">add coffee</h2>
        <button className='p-2 rounded-sm bg-secondary hover:bg-accent cursor-pointer'>
          <a className='text-black dark:text-background uppercase'>
            add category
          </a>
        </button>
      </div>
      <form 
        onSubmit={handleSubmit}
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
            className="w-full bg-secondary text-white p-2 rounded hover:bg-accent transition disabled:opacity-50 cursor-pointer uppercase"
        >
            save product
        </button>
        </form>
    </div>
  );
}
