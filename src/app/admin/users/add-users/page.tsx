"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { api } from '~/trpc/react';

export default function UserPage() {
  const register = api.auth.register.useMutation();
  const router = useRouter();

  // Form state sebagai objek
  const [formBody, setFormBody] = useState({
    name: "",
    email: "",
    password: "",
    role : "1", // role = 1: admin 2: user
  });

  // Error state sebagai objek
  const [error, setError] = useState<{ general?: string; password?: string; name?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBody({
      ...formBody,
      [e.target.name]: e.target.value,
    });

    // Clear error on change (optional)
    setError({});
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    if (formBody.password.length < 6) {
      setError({ password: "Password minimal 6 karakter." });
      setLoading(false);
      return;
    }

    register.mutate(
      formBody,
      {
        onSuccess: () => {
          setLoading(false);
          window.location.reload()
        },
        onError: (err) => {
            console.error("Error during registration ==> :", err);
            setError({ general: err.message });
            setLoading(false);
        },
        // onError: (error) => {
        //     // error bentuknya tRPC error, bisa cek di `error.data?.zodError`
        //     if (error.data?.zodError) {
        //         // error dari Zod validasi, biasanya ada bentuk seperti array kamu kasih
        //         const zodErrors = error.data.zodError.fieldErrors;
        //     // Contoh ambil error untuk field name
        //     if (zodErrors.name && zodErrors.name.length > 0) {
        //         setError({ name: zodErrors.name[0] });
        //     } else {
        //         setError({ general: error.message });
        //     }
        //     } else {
        //         // error umum dari backend
        //         setError({ general: error.message });
        //     }
        //     setLoading(false);
        // },
      }
    );
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        className="rounded w-full space-y-4"
      >
        {/* Error general */}
        {error.general && (
          <div className="text-red-600 bg-red-100 px-3 py-2 rounded text-sm">
            {error.general}
          </div>
        )}

        <input
          type="text"
          name="name"
          value={formBody.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          required
        />

        <input
          type="email"
          name="email"
          value={formBody.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          required
        />

        <input
          type="password"
          name="password"
          value={formBody.password}
          onChange={handleChange}
          placeholder="Password"
          className={`w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
            error.password ? "border-red-600" : ""
          }`}
          required
        />

        {/* Error password */}
        {error.password && (
          <div className="text-red-600 text-sm">{error.password}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary text-white py-2 rounded hover:bg-accent transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Registering Admin..." : "Register Admin"}
        </button>
      </form>
    </>
  );
}
