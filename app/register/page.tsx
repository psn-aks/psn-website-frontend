"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link"

import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/clientApi";


export default function RegisterPage() {

    const router = useRouter();
    const { user, login } = useAuth();

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.replace("/");
        }
    }, [user, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await api.post("/users/auth/register", {
                fullname,
                email,
                password,
            });

            router.replace("/login");

        } catch (err: any) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Registration failed";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-md mt-14 p-8">
                <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
                    Create Account
                </h1>

                <form onSubmit={handleRegister} className="space-y-3">
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={fullname}
                        placeholder="John Doe"
                        required
                        onChange={(e) => setFullname(e.target.value)}
                        disabled={loading}
                    />

                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="john@doe.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <label className="block text-sm text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="minimum of 6 characters"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition disabled:opacity-70"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}
