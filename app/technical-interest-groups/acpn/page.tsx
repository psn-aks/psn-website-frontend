"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"


export default function ACPNPage() {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
                <button
                    onClick={() => router.push("/technical-interest-groups")}
                    className="flex items-center gap-2 text-blue-600 hover:underline mb-6 cursor-pointer"
                >
                    <ArrowLeft size={18} /> Back to Groups
                </button>

                <GroupSubNav base="/technical-interest-groups/acpn" />

                <motion.h1
                    className="text-3xl font-bold text-green-700 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    ACPN - Association of Community Pharmacists of Nigeria
                </motion.h1>

                <p className="text-gray-700 mb-6">
                    ACPN focuses on supporting pharmacists practicing in community
                    settings. The association advocates for professional excellence,
                    ethical standards, and improved access to quality pharmaceutical care
                    for all Nigerians.
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Professional capacity building and continuing education</li>
                    <li>Public health advocacy and awareness campaigns</li>
                    <li>Promoting best practices in community pharmacy operations</li>
                </ul>
            </div>
        </main>
    )
}
