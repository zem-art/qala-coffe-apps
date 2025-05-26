"use client"
import { api } from "~/trpc/react";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const register = api.auth.register.useMutation();
  const router = useRouter();

  // Form state sebagai objek
  const [formBody, setFormBody] = useState({
    name: "",
    email: "",
    password: "",
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
          // router.push("/auth/sign-in");
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
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

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
          className="w-full px-3 py-2 border rounded border-main hover:border-accent"
          required
        />

        <input
          type="email"
          name="email"
          value={formBody.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded border-main hover:border-accent"
          required
        />

        <input
          type="password"
          name="password"
          value={formBody.password}
          onChange={handleChange}
          placeholder="Password"
          className={`w-full px-3 py-2 border rounded border-main hover:border-accent ${
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
          className="w-full bg-main text-white py-2 rounded hover:bg-main transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/sign-in")}
            className="text-main hover:underline cursor-pointer"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
