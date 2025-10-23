"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"


export default function EldersForumPage() {
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

                <GroupSubNav base="/technical-interest-groups/elders-forum" />

                <motion.h1
                    className="text-3xl font-bold text-green-700 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Elders Forum
                </motion.h1>

                <p className="text-gray-700 mb-6">
                    The Elders Forum comprises distinguished senior pharmacists who serve
                    as mentors, advisors, and custodians of the profession’s legacy. The
                    forum provides guidance, promotes unity, and supports intergenerational
                    collaboration among pharmacists.
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Mentorship and advisory programs</li>
                    <li>Preserving the history and ethics of the profession</li>
                    <li>Supporting leadership and succession planning</li>
                </ul>
            </div>
        </main>
    )
}
