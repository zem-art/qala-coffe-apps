"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

export const BookingForm = () => {
  // Replace with the correct mutation for booking that accepts all fields
  const createBooking = api.booking.create.useMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    phone : "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log('==>', form)
            if (!form.name || !form.email || !form.number || !form.message) {
                return alert("forms harus diisi.");
            }

            await createBooking.mutateAsync({
                name: form.name,
                email: form.email,
                phone : form.phone,
                number: parseInt(form.number),
                message: form.message,
            });

            setTimeout(() => {
              window.location.reload()
            }, 1000);
        } catch (error) {
            console.error("❌ Gagal menyimpan produk:", error);
            alert(error instanceof Error ? error.message : "Terjadi kesalahan");
        }
  };

  return (
    <section
      id="book"
      className="relative bg-[url('/image/booking-bg.jpg')] bg-cover bg-center bg-fixed py-20"
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight mb-2">
            reservasi
          </h1>
          <span className="block text-lg md:text-xl font-medium text-gray-300">pesan meja</span>
        </div>

        <form className="max-w-2xl mx-auto rounded-3xl p-8 bg-white shadow-2xl" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Nama"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
            />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              onChange={handleChange}
              type="number"
              name="phone"
              placeholder="Nomor Telepon"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
            />
            <input
              onChange={handleChange}
              type="number"
              name="number"
              placeholder="Jumlah Orang"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
            />
          </div>
          <textarea
            placeholder="Pesan"
            rows={5}
            name="message"
            onChange={handleChange}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none mb-6 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full py-4 bg-main text-white font-bold rounded-xl hover:bg-[#82481f] transition-all shadow-md active:scale-[0.98] capitalize text-lg"
          >
            kirim pesan
          </button>
        </form>
      </div>
    </section>
  );
};
