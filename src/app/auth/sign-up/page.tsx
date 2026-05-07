"use client"
import { api } from "~/trpc/react";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const register = api.auth.register.useMutation();
  const router = useRouter();

  const [formBody, setFormBody] = useState({
    name: "",
    email: "",
    password: "",
    role : "2"
  });

  const [error, setError] = useState<{ general?: string; password?: string; name?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormBody({
      ...formBody,
      [e.target.name]: e.target.value,
    });
    setError({});
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    if (formBody.password.length < 6) {
      setError({ password: "Password must be at least 6 characters long." });
      setLoading(false);
      return;
    }

    register.mutate(
      formBody,
      {
        onSuccess: () => {
          setLoading(false);
          router.push("/auth/sign-in");
        },
        onError: (err) => {
            console.error("Error during registration ==> :", err);
            setError({ general: err.message });
            setLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 font-poppins">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
            <a href="/" className="inline-block">
                <h1 className="text-3xl font-extrabold text-main mb-2">Create Account</h1>
            </a>
            <p className="text-gray-500 text-sm">Join us and start your journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error.general && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
              {error.general}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formBody.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formBody.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formBody.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:bg-white transition-colors outline-none ${
                error.password 
                  ? "border-red-300 focus:ring-red-500/50 focus:border-red-500" 
                  : "border-gray-200 focus:ring-main/50 focus:border-main"
              }`}
              required
            />
            {error.password && (
              <p className="text-sm text-red-500 mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition-all bg-main rounded-xl hover:bg-[#82481f] focus:ring-4 focus:ring-main/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/sign-in")}
            className="font-semibold text-main hover:underline transition-colors"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
