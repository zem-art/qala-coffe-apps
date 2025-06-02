"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

export const BookingForm = () => {
  // Replace with the correct mutation for booking that accepts all fields
  const createBokking = api.bokking.create.useMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
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

            await createBokking.mutateAsync({
                name: form.name,
                email: form.email,
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
      className={"bg-[url('/image/booking-bg.jpg')] bg-cover bg-center py-16 px-4"}
    >
      <h1 className="text-6xl md:text-5xl font-bold text-center text-main mb-10 uppercase">
        booking{" "}
        <span className="block text-lg font-normal">reserve a table</span>
      </h1>

      <form className="max-w-2xl mx-auto border border-main rounded-xl p-6 bg-white/60 backdrop-blur-md shadow" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 focus:outline-none focus:border-main/60"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 focus:outline-none focus:border-main/60"
        />
        <input
          onChange={handleChange}
          type="number"
          name="number"
          placeholder="Number"
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 focus:outline-none focus:border-main/60"
        />
        <textarea
          placeholder="Message"
          rows={6}
          name="message"
          onChange={handleChange}
          className="w-full p-3 text-base rounded-md bg-transparent border border-main text-main placeholder-main mb-4 resize-none focus:outline-none focus:border-main/60"
        ></textarea>
        <input
          type="submit"
          value="send message"
          className="btn bg-main text-white py-2 px-4 rounded-md hover:bg-main/80 cursor-pointer transition"
        />
      </form>
    </section>
  );
};
