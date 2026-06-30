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
                setErrorMsg("Failed to load providers. Please try again later.")
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
                setErrorMsg("Invalid email or password please check again.")
                setLoadingButton(false)
            }
        } catch (error) {
            setLoadingButton(false)
            console.error("Login error:", error)
            setErrorMsg("Something went wrong. Please try again.")
        }
    }

    const renderProviderButton = (provider: ClientSafeProvider) => {
        const providerStyles: Record<string, string> = {
            Google: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
            GitHub: "bg-[#24292F] text-white hover:bg-[#24292F]/90",
            Facebook: "bg-[#1877F2] text-white hover:bg-[#1877F2]/90",
            Discord: "bg-[#5865F2] text-white hover:bg-[#5865F2]/90",
        }

        const iconName = {
            Google: "FaGoogle",
            GitHub: "FaGithub",
            Facebook: "FaFacebook",
            Discord: "FaDiscord",
        }[provider.name]

        // Use a generic icon or colored icon for Google
        const iconColor = provider.name === "Google" ? "text-red-500" : "text-current";

        return (
            <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all shadow-sm font-medium ${providerStyles[provider.name] ?? "bg-gray-200 text-gray-800"}`}
            >
                <div className={iconColor}>
                    <IconRenderer lib="fa" name={iconName ?? ""} size={20} />
                </div>
                <span>{provider.name}</span>
            </button>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 font-poppins">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <a href="/" className="inline-block">
                        <h1 className="text-3xl font-extrabold text-main mb-2">Welcome Back</h1>
                    </a>
                    <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <a href="#" className="text-xs text-main hover:underline font-medium">Forgot password?</a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-main/50 focus:border-main focus:bg-white transition-colors outline-none"
                            required
                        />
                    </div>

                    {errorMsg && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={LoadingButton}
                        className="w-full py-3 font-semibold text-white transition-all bg-main rounded-xl hover:bg-[#82481f] focus:ring-4 focus:ring-main/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                        {LoadingButton ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 text-gray-500 bg-white">Or continue with</span>
                    </div>
                </div>
                {/* 
                {!loading && providers ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                        {Object.values(providers)
                            .filter((provider) => provider.id !== "credentials")
                            .map(renderProviderButton)}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="w-6 h-6 border-2 border-main border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )} */}

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/auth/sign-up")}
                        className="font-semibold text-main hover:underline transition-colors"
                    >
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    )
}
