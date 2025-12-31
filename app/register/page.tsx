"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/clientApi"

const MIN_PASSWORD_LENGTH = 6

export default function RegisterPage() {
    const router = useRouter()
    const { user } = useAuth()

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            router.replace("/")
        }
    }, [user, router])

    const isPasswordTooShort =
        password.length > 0 && password.length < MIN_PASSWORD_LENGTH

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
            return
        }

        setLoading(true)

        try {
            await api.post("/users/auth/register", {
                fullname,
                email,
                password,
            })

            router.replace("/login")
        } catch (err: any) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Registration failed"

            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-md mt-14 p-8">
                <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
                    Create Account
                </h1>

                <form onSubmit={handleRegister} className="space-y-3">
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="John Doe"
                            required
                            disabled={loading}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@doe.com"
                            required
                            disabled={loading}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Minimum of 6 characters"
                                required
                                disabled={loading}
                                className={`w-full border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2
                  ${isPasswordTooShort
                                        ? "border-red-400 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-green-500"
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                disabled={loading}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {isPasswordTooShort && (
                            <p className="text-xs text-red-500 mt-1">
                                Password must be at least {MIN_PASSWORD_LENGTH} characters
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || password.length < MIN_PASSWORD_LENGTH}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition disabled:opacity-70"
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
