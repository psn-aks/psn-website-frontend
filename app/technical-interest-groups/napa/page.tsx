"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"

export default function NAPAPage() {
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

                <GroupSubNav base="/technical-interest-groups/napa" />

                <motion.h1
                    className="text-3xl font-bold text-green-700 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    NAPA - Nigerian Association of Pharmacists in Academia
                </motion.h1>

                <p className="text-gray-700 mb-6">
                    NAPA (Nigerian Association of Pharmacists in Academia) is dedicated to advancing
                    the roles and contributions of pharmacists in teaching, research, and academic leadership.
                    The association supports excellence in pharmaceutical education and fosters
                    the development of future pharmacy professionals through scholarship and mentorship.

                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Pharmaceutical education and curriculum development</li>
                    <li>Academic research, innovation, and knowledge dissemination</li>
                    <li>Capacity building, mentorship, and collaboration within academic institutions</li>
                </ul>
            </div>
        </main>
    )
}
