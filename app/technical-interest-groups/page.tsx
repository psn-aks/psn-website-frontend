"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const groups = [
    {
        name: "ALPS",
        description: "Association of Lady Pharmacists",
        href: "/technical-interest-groups/alps",
    },
    {
        name: "ACPN",
        description: "Association of Community Pharmacists of Nigeria",
        href: "/technical-interest-groups/acpn",
    },
    {
        name: "Elders Forum",
        description: "Pharmacy Elders Advisory Forum",
        href: "/technical-interest-groups/elders-forum",
    },
    {
        name: "PSNYPG",
        description: "Pharmaceutical Society of Nigeria Young Pharmacists Group",
        href: "/technical-interest-groups/psnypg",
    },
    {
        name: "AHAPN",
        description: "Association of Hospital and Administrative Pharmacists of Nigeria",
        href: "/technical-interest-groups/ahapn",
    },
    {
        name: "NAIP",
        description: "Nigerian Association of Industrial Pharmacists",
        href: "/technical-interest-groups/naip",
    },
]

export default function TechnicalGroupsPage() {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-24">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h1
                    className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Technical / Interest Groups
                </motion.h1>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Explore the various professional and technical groups within the
                    pharmaceutical community.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {groups.map((group, index) => (
                        <motion.div
                            key={group.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(group.href)}
                            className="bg-green-100 rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-2 transition cursor-pointer border border-gray-100"
                        >
                            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                                {group.name}
                            </h2>
                            <p className="text-gray-600 text-sm">{group.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
