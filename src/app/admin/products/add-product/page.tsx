
"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { api } from "~/trpc/react";

export default function AddProduct() {
    const utils = api.useUtils();
    const createProduct = api.product.create.useMutation();
    const createCategory = api.category.create.useMutation()
    const { data: categories } = api.category.getCategories.useQuery();
    const router = useRouter()

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: "",
    });

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (
                !form.name ||
                !form.description ||
                !form.price ||
                !form.categoryId
            ) {
                throw new Error("Semua field harus diisi.");
            }

            await createProduct.mutateAsync({
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                imageUrl: form.imageUrl,
                categoryId : form.categoryId,
            });

            await utils.invalidate();
            router.replace('/admin/products')
            // window.location.reload();
        } catch (error) {
            console.error("❌ Gagal membuat produk:", error);
            alert(error instanceof Error ? error.message : "Terjadi kesalahan");
        }
    };

    const handleAddCategory = async () => {
        const nama_category = prompt('Input Category');
        if (!nama_category) return;
        
        try {
            await createCategory.mutateAsync({ name: nama_category.toLowerCase() });
            window.location.reload()
            // alert('Kategori berhasil ditambahkan');
        } catch (error) {
            console.error('Gagal menambahkan kategori:', error);
            alert('Terjadi kesalahan saat menambahkan kategori');
        }
    };

    return (
        <div className="">
            <div className='flex items-center justify-between pb-4'>
                <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">add coffee</h2>
                <div className='items-center justify-between flex row'>
                    <button className='p-2 rounded-sm bg-primary hover:bg-accent cursor-pointer mr-2'>
                        <a className='text-black dark:text-background uppercase' href='/admin/products'>
                            back
                        </a>
                    </button>
                    <button className='p-2 rounded-sm bg-secondary hover:bg-accent cursor-pointer' onClick={handleAddCategory}>
                        <a className='text-black dark:text-background uppercase'>
                            add category
                        </a>
                    </button>
                </div>
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
