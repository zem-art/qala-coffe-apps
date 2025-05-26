"use client"
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IconRenderer } from "~/app/_components/IconRenderer"

export default function LoginPage() {
    const [providers, setProviders] = useState<any>(null)
    const [loadingProviders, setLoadingProviders] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    console.log("LoginPage rendered")

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await getProviders()
                setProviders(res)
            } catch (error) {
                console.error("Failed to fetch providers:", error)
            } finally {
                setLoadingProviders(false)
            }
        }

        fetchProviders()
    }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
            const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (res?.ok) router.push("/dashboard")
        else alert("Login gagal!")
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded"
                    required
                />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-center space-x-8">
                    <div className="h-px bg-gray-300 w-full"></div>
                    <span className="text-gray-500 text-sm">with</span>
                    <div className="h-px bg-gray-300 w-full"></div>
                </div>

                {/* Third-party providers */}
                {!loadingProviders && providers && (
                    <div className="space-x-2 row flex justify-center items-center w-full">
                        {Object.values(providers).map((provider: any) =>
                            provider.id !== "credentials" ? (
                                <button
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 py-2 rounded-md hover:bg-gray-200 transition p-4 cursor-pointer"
                                    >
                                    {/* Optional: add provider icon */}
                                    <IconRenderer
                                        lib="fa"
                                        name={provider.name == "Google" ? "FaGoogle" : provider.name == "GitHub" ? "FaGithub" : provider.name == "Facebook" ? "FaFacebook" : "FaDiscord"}
                                        className="w-5 h-5"
                                        size={24}
                                    />
                                    {/* <span className="text-sm text-gray-700">{provider.name}</span> */}
                                </button>
                            ) : null
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
