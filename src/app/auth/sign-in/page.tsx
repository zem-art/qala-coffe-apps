"use client"
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { ClientSafeProvider } from "node_modules/next-auth/lib/client"
import { useEffect, useState } from "react"
import { IconRenderer } from "~/app/_components/IconRenderer"

export default function LoginPage() {
    const [providers, setProviders] = useState<Awaited<ReturnType<typeof getProviders>> | null>(null)
    const [loading, setLoading] = useState(true)
    const [LoadingButton, setLoadingButton] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const router = useRouter()

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await getProviders()
                setProviders(res)
            } catch (error) {
                console.error("Error fetching providers:", error)
                setErrorMsg("Gagal memuat metode login. Silakan coba lagi nanti.")
            } finally {
                setLoading(false)
            }
        }

        fetchProviders()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMsg("")
        setLoadingButton(true)

        try {
            const res: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            console.log("Login successful ==> ", res)
            if (!res?.error && res?.ok) {
                router.push("/admin/dashboard")
                setLoadingButton(false)
            } else {
                console.error("Login failed:", res?.error)
                setErrorMsg("Email atau kata sandi tidak valid. Silakan periksa kembali.")
                setLoadingButton(false)
            }
        } catch (error) {
            setLoadingButton(false)
            console.error("Login error:", error)
            setErrorMsg("Terjadi kesalahan. Silakan coba lagi.")
        }
    }

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
                    <p className="text-gray-300 text-sm mt-2">Selamat datang kembali! Masuk ke akun Anda.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-200 ml-1" htmlFor="email">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <IconRenderer lib="fa" name="FaEnvelope" size={16} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-main/80 focus:border-main text-white placeholder-gray-400 transition-all outline-none backdrop-blur-sm"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-sm font-medium text-gray-200" htmlFor="password">Kata Sandi</label>
                            <a href="#" className="text-xs text-gray-300 hover:text-white hover:underline font-medium transition-colors">Lupa kata sandi?</a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <IconRenderer lib="fa" name="FaLock" size={16} />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-main/80 focus:border-main text-white placeholder-gray-400 transition-all outline-none backdrop-blur-sm"
                                required
                            />
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="p-4 text-sm text-red-200 bg-red-900/40 border border-red-500/30 rounded-xl flex items-start gap-3 backdrop-blur-md">
                            <IconRenderer lib="fa" name="FaExclamationCircle" className="mt-0.5 shrink-0" size={16} />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={LoadingButton}
                        className="w-full py-4 font-bold text-white transition-all bg-main rounded-2xl hover:bg-[#82481f] focus:ring-4 focus:ring-main/50 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl active:scale-[0.98] mt-2 tracking-wide uppercase text-sm"
                    >
                        {LoadingButton ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Sedang masuk...
                            </span>
                        ) : "Masuk Sekarang"}
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 text-gray-400 bg-[#1a1614] rounded-full backdrop-blur-xl">Atau</span>
                    </div>
                </div>

                <p className="text-sm text-center text-gray-300">
                    Belum punya akun?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/auth/sign-up")}
                        className="font-bold text-white hover:text-main hover:underline transition-colors"
                    >
                        Daftar di sini
                    </button>
                </p>
            </div>
        </div>
    )
}
