"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { IconRenderer } from "~/app/_components/IconRenderer";

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
        { enabled: !!productId && isEditMode }
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
                throw new Error("Semua kolom harus diisi.");
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
        const nama_category = prompt('Masukkan Nama Kategori Baru:');
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
        <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                        {isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Lengkapi informasi produk di bawah ini.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.push('/admin/products')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        <IconRenderer lib="fa" name="FaArrowLeft" size={14} />
                        Kembali
                    </button>
                    <button 
                        onClick={handleAddCategory}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-xl hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors font-medium cursor-pointer"
                    >
                        <IconRenderer lib="fa" name="FaPlus" size={14} />
                        Kategori Baru
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 text-sm">
                    <div className="space-y-1.5">
                        <label className="block font-medium text-gray-700 dark:text-gray-300">Nama Produk <span className="text-red-500">*</span></label>
                        <input
                            name="name"
                            placeholder="Contoh: Kopi Susu Aren"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="block font-medium text-gray-700 dark:text-gray-300">Kategori <span className="text-red-500">*</span></label>
                            <select
                                name="categoryId"
                                value={form.categoryId}
                                onChange={handleChange}
                                className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white capitalize"
                                required
                            >
                                <option value="" disabled>Pilih Kategori...</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id} className="capitalize">
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="block font-medium text-gray-700 dark:text-gray-300">Harga (Rp) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                                <input
                                    name="price"
                                    placeholder="25000"
                                    value={form.price}
                                    onChange={handleChange}
                                    type="number"
                                    step="0.01"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block font-medium text-gray-700 dark:text-gray-300">URL Gambar Produk</label>
                        <input
                            name="imageUrl"
                            placeholder="https://example.com/image.png (opsional)"
                            value={form.imageUrl}
                            onChange={handleChange}
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block font-medium text-gray-700 dark:text-gray-300">Deskripsi Singkat <span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            placeholder="Deskripsikan cita rasa atau bahan dari produk ini..."
                            value={form.description}
                            rows={5}
                            onChange={handleChange}
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white resize-none"
                            required
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3.5 bg-main text-white font-bold rounded-xl hover:bg-[#82481f] focus:ring-4 focus:ring-main/30 shadow-md hover:shadow-lg active:scale-95 transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
                        >
                            <IconRenderer lib="fa" name="FaSave" size={16} />
                            {isEditMode ? "Perbarui Produk" : "Simpan Produk"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
