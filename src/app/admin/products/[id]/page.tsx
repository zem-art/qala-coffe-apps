"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function AddOrEditProduct() {
    const utils = api.useUtils();
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string || undefined;
    const isEditMode = productId !== 'new'

    const createProduct = api.product.create.useMutation();
    const updateProduct = api.product.update.useMutation(); // Asumsikan ada endpoint update
    const getProductById = api.product.getById.useQuery(
        { id: String(productId) },
        { enabled: !!productId }
    );

    const createCategory = api.category.create.useMutation();
    const { data: categories } = api.category.getCategories.useQuery();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: "",
    });

    useEffect(() => {
        if (isEditMode && getProductById.data) {
            const product = getProductById.data;
            setForm({
                name: product.name || "",
                description: product.description || "",
                price: product.price.toString(),
                imageUrl: product.imageUrl || "",
                categoryId: product.categoryId?.toString() || "",
            });
        }
    }, [getProductById.data, isEditMode]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!form.name || !form.description || !form.price || !form.categoryId) {
                throw new Error("Semua field harus diisi.");
            }

            if (isEditMode) {
                await updateProduct.mutateAsync({
                    id: String(productId),
                    name: form.name,
                    description: form.description,
                    price: String(form.price),
                    imageUrl: form.imageUrl,
                    categoryId: parseInt(form.categoryId),
                });
            } else {
                await createProduct.mutateAsync({
                    name: form.name,
                    description: form.description,
                    price: String(form.price),
                    imageUrl: form.imageUrl,
                    categoryId: parseInt(form.categoryId),
                });
            }

            await utils.invalidate();
            router.replace('/admin/products');
        } catch (error) {
            console.error("❌ Gagal menyimpan produk:", error);
            alert(error instanceof Error ? error.message : "Terjadi kesalahan");
        }
    };

    const handleAddCategory = async () => {
        const nama_category = prompt('Input Category');
        if (!nama_category) return;

        try {
            await createCategory.mutateAsync({ name: nama_category.toLowerCase() });
            window.location.reload();
        } catch (error) {
            console.error('Gagal menambahkan kategori:', error);
            alert('Terjadi kesalahan saat menambahkan kategori');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between pb-4">
                <h2 className="text-2xl font-bold mb-4 dark:text-background uppercase">
                    {isEditMode ? 'Edit Product' : 'Add Coffee'}
                </h2>
                <div className="items-center justify-between flex row">
                    <button className="p-2 rounded-sm bg-primary hover:bg-accent cursor-pointer mr-2">
                        <a className="text-black dark:text-background uppercase" href="/admin/products">
                            back
                        </a>
                    </button>
                    <button className="p-2 rounded-sm bg-secondary hover:bg-accent cursor-pointer" onClick={handleAddCategory}>
                        <a className="text-black dark:text-background uppercase">
                            add category
                        </a>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-background text-black dark:bg-gray-800 dark:text-white dark:border-accent border-accent"
                    required
                />
                <input
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    type="number"
                    step="0.01"
                    className="w-full p-2 border rounded bg-background text-black dark:bg-gray-800 dark:text-white dark:border-accent border-accent"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-background text-black dark:bg-gray-800 dark:text-white dark:border-accent border-accent"
                />
                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-background text-black dark:bg-gray-800 dark:text-white dark:border-accent border-accent"
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
                    className="w-full bg-secondary text-white p-2 rounded hover:bg-accent transition uppercase cursor-pointer"
                >
                    {isEditMode ? "Update Product" : "Save Product"}
                </button>
            </form>
        </div>
    );
}
