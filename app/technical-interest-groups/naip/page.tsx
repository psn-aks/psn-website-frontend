"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"

export default function NAIPPage() {
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

                <GroupSubNav base="/technical-interest-groups/naip" />

                <motion.h1
                    className="text-3xl font-bold text-green-700 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    NAIP - Nigerian Association of Industrial Pharmacists
                </motion.h1>

                <p className="text-gray-700 mb-6">
                    NAIP is focused on advancing the interests of industrial pharmacists
                    involved in manufacturing, regulatory affairs, and pharmaceutical
                    innovation. It plays a critical role in promoting local drug
                    production and industrial capacity.
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Pharmaceutical manufacturing and quality assurance</li>
                    <li>Regulatory engagement and industry collaboration</li>
                    <li>Research, innovation, and industrial capacity building</li>
                </ul>
            </div>
        </main>
    )
}
