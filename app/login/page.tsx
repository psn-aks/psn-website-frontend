"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/clientApi";

export default function LoginPage() {
    const router = useRouter();
    const { user, login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isPasswordTooShort = password.length > 0 && password.length < 6;

    useEffect(() => {
        if (user) {
            router.replace("/");
        }
    }, [user, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const { data } = await api.post("/users/auth/login", {
                email,
                password,
            });

            login(data.user);
            router.replace("/");
        } catch (err: any) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Invalid login credentials";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-md p-8">
                <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Email */}
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />

                    {/* Password */}
                    <label className="block text-sm text-gray-600 mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {isPasswordTooShort && (
                        <p className="text-xs text-red-500">
                            Password must be at least 6 characters
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition disabled:opacity-70"
                        disabled={loading || password.length < 6}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm text-right">
                        <Link
                            href="/forgot-password"
                            className="text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </p>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
}
