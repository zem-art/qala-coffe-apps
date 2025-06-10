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
            const res:any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            console.log("Login successful ==> ", res)
            if (!res?.error && res?.ok) {
                router.push("/admin/dashboard")
                setLoadingButton(false)
                // alert("Login successful! Redirecting to home page...")
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
            Google: "bg-[#f44242] text-white hover:bg-[#e83535]",
            GitHub: "bg-[#333] text-white hover:bg-[#444]",
            Facebook: "bg-[#1877F2] text-white hover:bg-[#165EAB]",
            Discord: "bg-[#5865F2] text-white hover:bg-[#4752C4]",
        }

        const iconName = {
            Google: "FaGoogle",
            GitHub: "FaGithub",
            Facebook: "FaFacebook",
            Discord: "FaDiscord",
        }[provider.name]

        return (
            <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition cursor-pointer ${providerStyles[provider.name] ?? "bg-gray-200"}`}
            >
                <IconRenderer lib="fa" name={iconName ?? ""} size={24} />
                <span>{provider.name}</span>
            </button>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <a href="/">
                        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    </a>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-3 py-2 border rounded border-main hover:border-accent"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-3 py-2 border rounded border-main hover:border-accent"
                        required
                    />

                    {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

                    <button
                        type="submit"
                        disabled={LoadingButton}
                        className="w-full bg-main text-white py-2 rounded hover:bg-accent transition cursor-pointer"
                    >
                        {LoadingButton ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="flex items-center justify-center space-x-4">
                    <div className="h-px bg-gray-300 w-full"></div>
                    <span className="text-gray-500 text-sm">with</span>
                    <div className="h-px bg-gray-300 w-full"></div>
                </div>

                {!loading && providers && (
                    <div className="flex flex-wrap justify-center gap-3">
                        {Object.values(providers)
                            .filter((provider) => provider.id !== "credentials")
                            .map(renderProviderButton)}
                    </div>
                )}

                <p className="mt-4 text-center text-sm">
                    Don't have an account yet ? {" "}
                    <button
                        type="button"
                        onClick={() => router.push("/auth/sign-up")}
                        className="text-main hover:underline cursor-pointer"
                    >
                        Sign Up Here
                    </button>
                </p>
            </div>
        </div>
    )
}
