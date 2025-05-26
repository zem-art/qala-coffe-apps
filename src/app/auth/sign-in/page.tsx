"use client"
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoginPage() {
    const [providers, setProviders] = useState<any>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    console.log("LoginPage rendered")

    useEffect(() => {
        console.log("Fetching providers...")

        const fetchProviders = async () => {
            const res = await getProviders()
            console.log("Providers fetched:", res)
            setProviders(res)
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
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" className="mb-3 w-full px-3 py-2 border rounded" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" className="mb-3 w-full px-3 py-2 border rounded" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
            {/* {Object.values(providers).map((provider: any) => (
                <div key={provider.name}>
                    <button
                    onClick={() => signIn(provider.id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
                    >
                    Sign in with {provider.name}
                    </button>
                </div>
            ))} */}
        </div>
    )
}
