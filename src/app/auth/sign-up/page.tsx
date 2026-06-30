"use client"
import { api } from "~/trpc/react";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { IconRenderer } from "~/app/_components/IconRenderer"

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
      setError({ password: "Kata sandi minimal 6 karakter." });
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
    <div 
        className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center bg-fixed font-poppins relative"
        style={{ backgroundImage: "url('/image/booking-bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 space-y-8 bg-white/10 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/20">
        <div className="text-center">
            <a href="/" className="inline-flex items-center gap-3 mb-2 group">
                <IconRenderer lib="fa" name="FaCoffee" className="text-white group-hover:scale-110 transition-transform" size={28} />
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Qala Coffee</h1>
            </a>
            <p className="text-gray-300 text-sm mt-2">Bergabunglah dan mulai perjalanan Anda</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {error.general && (
            <div className="p-4 text-sm text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl flex items-start gap-3 backdrop-blur-md">
                <IconRenderer lib="fa" name="FaExclamationCircle" className="mt-0.5 shrink-0" size={16} />
                <span>{error.general}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 ml-1" htmlFor="name">Nama Lengkap</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <IconRenderer lib="fa" name="FaUser" size={16} />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formBody.name}
                  onChange={handleChange}
                  placeholder="Budi Santoso"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-main/80 focus:border-main text-white placeholder-gray-400 transition-all outline-none backdrop-blur-sm"
                  required
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 ml-1" htmlFor="email">Email</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <IconRenderer lib="fa" name="FaEnvelope" size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formBody.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-main/80 focus:border-main text-white placeholder-gray-400 transition-all outline-none backdrop-blur-sm"
                  required
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 ml-1" htmlFor="password">Kata Sandi</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <IconRenderer lib="fa" name="FaLock" size={16} />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formBody.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3.5 bg-white/10 border rounded-2xl focus:ring-2 transition-all outline-none backdrop-blur-sm text-white placeholder-gray-400 ${
                    error.password 
                      ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500" 
                      : "border-white/20 focus:ring-main/80 focus:border-main"
                  }`}
                  required
                />
            </div>
            {error.password && (
              <p className="text-sm text-red-300 mt-1.5 ml-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-white transition-all bg-main rounded-2xl hover:bg-[#82481f] focus:ring-4 focus:ring-main/50 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl active:scale-[0.98] mt-2 tracking-wide uppercase text-sm"
          >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Membuat akun...
                </span>
            ) : "Daftar"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-300">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/sign-in")}
            className="font-bold text-white hover:text-main hover:underline transition-colors"
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
}
