"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"

export default function AHAPNPage() {
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
                
                <GroupSubNav base="/technical-interest-groups/ahapn" />

                <motion.h1
                    className="text-3xl font-bold text-green-700 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    AHAPN - Association of Hospital and Administrative Pharmacists of Nigeria
                </motion.h1>

                <p className="text-gray-700 mb-6">
                    AHAPN promotes excellence in hospital pharmacy practice and healthcare
                    administration. The group supports pharmacists in clinical, academic,
                    and administrative roles, enhancing patient safety and service delivery.
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Hospital pharmacy practice development</li>
                    <li>Clinical training and policy advocacy</li>
                    <li>Continuing professional education and collaboration</li>
                </ul>
            </div>
        </main>
    )
}
