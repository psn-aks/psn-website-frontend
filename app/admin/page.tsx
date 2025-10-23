"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Newspaper, UserCog, Pill } from "lucide-react";

export default function AdminDashboard() {
    const cards = [
        {
            title: "Manage News & Updates",
            description: "Create, edit, or delete news articles and announcements.",
            href: "/admin/news",
            icon: <Newspaper className="w-10 h-10 text-blue-600" />,
            color: "bg-blue-50 hover:bg-blue-100",
        },
        {
            title: "Manage Pharmacists",
            description: "Add, edit, or remove pharmacist records and details.",
            href: "/admin/pharmacists",
            icon: <UserCog className="w-10 h-10 text-green-600" />,
            color: "bg-green-50 hover:bg-green-100",
        },
        {
            title: "Manage Adverts",
            description: "Add, edit, or remove adverts.",
            href: "/admin/adverts",
            icon: <Pill className="w-10 h-10 text-blue-600" />,
            color: "bg-blue-50 hover:bg-blue-100",
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-20 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Admin Dashboard
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={card.href}
                                className={`${card.color} block rounded-2xl shadow-md hover:shadow-lg transition p-8 text-center`}
                            >
                                <div className="flex flex-col items-center justify-center gap-4">
                                    {card.icon}
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {card.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm max-w-sm mx-auto">
                                        {card.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
