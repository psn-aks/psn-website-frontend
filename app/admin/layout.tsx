"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Newspaper,
    UserCog,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Pill
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // true => sidebar is visible/open; false => hidden (slid left)
    const [open, setOpen] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // avoid hydration mismatch
    if (!mounted) return <div className="min-h-screen bg-gray-100" />;

    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/news", label: "News", icon: Newspaper },
        { href: "/admin/pharmacists", label: "Pharmacists", icon: UserCog },
        { href: "/admin/adverts", label: "Adverts", icon: Pill },
    ];

    // animation variants for sidebar
    const sidebarVariants: Variants = {
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: {
            x: "-100%",
            transition: { type: "spring", stiffness: 300, damping: 30 },
        },
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <AnimatePresence>
                <motion.aside
                    // keep mounted to allow icon button inside to always work (AnimatePresence handles exit)
                    initial={false}
                    animate={open ? "open" : "closed"}
                    variants={sidebarVariants}
                    exit="closed"
                    className="fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-md flex flex-col"
                    style={{ minWidth: 260 }}
                >
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b">
                        <h2 className="text-2xl font-bold text-green-700">Admin</h2>

                        {/* Collapse button inside sidebar -> shows "<" */}
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Collapse sidebar"
                            className="p-2 hover:bg-gray-100 rounded-md transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-5 space-y-2 overflow-auto">
                        {links.map(({ href, label, icon: Icon }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => {
                                        // if on small screen we may want to auto-close; keep UX consistent
                                        if (window.innerWidth < 1024) setOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${active ? "bg-green-600 text-white shadow-sm" : "text-gray-700 hover:bg-green-50"
                                        }`}
                                >
                                    <Icon className="w-5 h-5 shrink-0" />
                                    <span>{label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t">
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </motion.aside>
            </AnimatePresence>

            {/* Re-open control when sidebar is closed: a small fixed chevron on the left edge */}
            {!open && (
                <button
                    aria-label="Open sidebar"
                    onClick={() => setOpen(true)}
                    className="fixed left-2 top-4 z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
                >
                    <ChevronRight size={18} />
                </button>
            )}

            {/* Small-screen hamburger to open sidebar */}
            <div className="lg:hidden">
                {/* top-left hamburger inside main area */}
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open sidebar"
                    className="fixed left-4 top-4 z-40 w-10 h-10 rounded-md bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 lg:hidden"
                >
                    <Menu size={18} />
                </button>
            </div>

            {/* Main content area (pushes right automatically because sidebar is fixed) */}
            <main className="flex-1 p-8 lg:pl-8">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {links.find((l) => pathname.startsWith(l.href))?.label || "Admin Panel"}
                    </h1>

                    {/* optional additional top controls */}
                    <div className="flex items-center gap-3">
                        {/* you can add buttons here */}
                    </div>
                </div>

                <div>{children}</div>
            </main>
        </div>
    );
}
