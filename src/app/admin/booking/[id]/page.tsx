"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { IconRenderer } from "~/app/_components/IconRenderer";

export default function EditBooking() {
    const utils = api.useUtils();
    const router = useRouter();
    const params = useParams();
    const bookingId = params?.id as string || undefined;

    const updateBooking = api.booking.update.useMutation();
    const getBookingById = api.booking.getById.useQuery(
        { id: String(bookingId) },
        { enabled: !!bookingId }
    );

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        number: "",
        message: "",
    });

    useEffect(() => {
        if (getBookingById.data) {
            const booking = getBookingById.data;
            setForm({
                name: booking.name || "",
                email: booking.email || "",
                phone: booking.phone || "",
                number: booking.number.toString(),
                message: booking.message || "",
            });
        }
    }, [getBookingById.data]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!form.name || !form.email || !form.number) {
                throw new Error("Kolom Nama, Email, dan Jumlah Orang wajib diisi.");
            }

            await updateBooking.mutateAsync({
                id: String(bookingId),
                name: form.name,
                email: form.email,
                phone: form.phone,
                message: form.message,
                number: parseInt(form.number),
            });

            await utils.invalidate();
            router.replace('/admin/booking');
        } catch (error) {
            console.error("❌ Gagal menyimpan reservasi:", error);
            alert(error instanceof Error ? error.message : "Terjadi kesalahan");
        }
    };

    if (getBookingById.isLoading) {
        return <div className="p-8 text-center text-gray-500">Memuat data reservasi...</div>;
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                        Edit Reservasi
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Perbarui informasi reservasi pelanggan di bawah ini.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.push('/admin/booking')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                        <IconRenderer lib="fa" name="FaArrowLeft" size={14} />
                        Kembali
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="block font-medium text-gray-700 dark:text-gray-300">Nama Pemesan <span className="text-red-500">*</span></label>
                            <input
                                name="name"
                                placeholder="Contoh: Budi Santoso"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="block font-medium text-gray-700 dark:text-gray-300">Email <span className="text-red-500">*</span></label>
                            <input
                                name="email"
                                type="email"
                                placeholder="budi@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-medium text-gray-700 dark:text-gray-300">No. Telepon</label>
                            <input
                                name="phone"
                                placeholder="081234567890"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-medium text-gray-700 dark:text-gray-300">Jumlah Orang <span className="text-red-500">*</span></label>
                            <input
                                name="number"
                                type="number"
                                placeholder="2"
                                value={form.number}
                                onChange={handleChange}
                                className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block font-medium text-gray-700 dark:text-gray-300">Pesan Khusus</label>
                        <textarea
                            name="message"
                            placeholder="Catatan tambahan (misalnya: minta meja di dekat jendela...)"
                            value={form.message}
                            rows={4}
                            onChange={handleChange}
                            className="w-full p-3.5 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main dark:focus:ring-main/50 focus:bg-white transition-colors outline-none text-gray-900 dark:text-white resize-none"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3.5 bg-main text-white font-bold rounded-xl hover:bg-[#82481f] focus:ring-4 focus:ring-main/30 shadow-md hover:shadow-lg active:scale-95 transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
                        >
                            <IconRenderer lib="fa" name="FaSave" size={16} />
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
