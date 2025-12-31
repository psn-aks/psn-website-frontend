"use client"

import { useState } from "react"
import { api } from "@/lib/clientApi"
import Link from "next/link"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // reset UI state
        setError("")
        setSuccess(false)
        setLoading(true)

        try {
            await api.post("/users/password-reset-request", { email })

            // clear input + show success
            setEmail("")
            setSuccess(true)
        } catch (err: any) {
            setError(
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Something went wrong"
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-md p-8">
                <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
                    Forgot Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-green-600 text-sm text-center">
                            If the email exists, a password reset link has been sent.
                        </p>
                    )}

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading || success}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition disabled:opacity-70"
                    >
                        {loading
                            ? "Sending..."
                            : success
                                ? "Email sent 🎊"
                                : "Send reset link"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Back to login
                    </Link>
                </p>
            </div>
        </main>
    )
}
