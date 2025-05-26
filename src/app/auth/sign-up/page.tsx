"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
            const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        })
        if (res.ok) router.push("/login")
        else alert("Register gagal!")
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" className="mb-3 w-full px-3 py-2 border rounded" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" className="mb-3 w-full px-3 py-2 border rounded" required />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
            </form>
        </div>
    )
}
