"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image";

import { useAuth } from "@/context/AuthContext"


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-6 py-1 flex justify-between items-center">
                {/* Logo */}

                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/logo.png"
                        alt="Pharmacy landing page"
                        width={40}
                        height={20}
                        className="rounded-2xl shadow-lg"
                        priority
                    />
                    <span className="text-2xl font-bold text-blue-900">PSN AKS</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <a href="/" className="hover:text-blue-600 transition">Home</a>
                    <a href="/news" className="hover:text-blue-600 transition">News</a>
                    <a href="/#contact" className="hover:text-blue-600 transition">Contact</a>
                    <a href="/pharmacists" className="hover:text-blue-600 transition">
                        Pharmacists
                    </a>
                    <a href="/technical-interest-groups" className="hover:text-blue-600 transition">
                        Technical/Interest Groups
                    </a>
                    <a href="/quiz" className="hover:text-blue-600 transition">
                        Quiz
                    </a>
                    <a href="/about" className="hover:text-blue-600 transition">
                        About US
                    </a>

                    {user ? (
                        <>
                            <span className="font-semibold">Hello, {user.fullname}</span>
                            <button onClick={logout} className="bg-red-600 text-white hover:bg-red-300 px-5 py-1 rounded">
                                Logout
                            </button>
                        </>

                    ):(
                        <>
                                {/* Desktop Buttons */}
                                <div className="hidden md:flex items-center gap-4">
                                    <Link href="/login">
                                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-green-50">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="bg-green-600 text-white hover:bg-green-700 px-5">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                        </>
                        
                    )}

                </div>

                
                {/* Mobile Menu Button */}
                <button className="md:hidden text-blue-700 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden bg-white border-t border-blue-100 shadow-lg"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <a href="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">Home</a>
                            <a href="/news" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">News</a>
                            <a href="/#contact" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">Contact</a>
                            <a href="/pharmacists" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
                                Pharmacists
                            </a>
                            <a href="/technical-interest-groups" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
                                Technical/Interest Groups
                            </a>
                            <a href="/quiz" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
                                Quiz
                            </a>
                            <a href="/about" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
                                About US
                            </a>

                            {user ? (
                                <>
                                    <span className="block py-2 px-3">Hello, {user.fullname}</span>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                        className="bg-red-600 text-white hover:bg-red-300 px-5 py-1 rounded"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                        <Link href="/login" onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-green-50 w-40">Log In</Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setIsOpen(false)}>
                                            <Button className="bg-green-600 text-white hover:bg-grren-700 w-40">Get Started</Button>
                                        </Link>
                                </>
                            )}

                            
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
