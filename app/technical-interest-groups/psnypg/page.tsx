"use client"

import { motion } from "framer-motion"
import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"
import BackToGroup from "@/app/technical-interest-groups/components/BackToGroup"

export default function PSNYPGPage() {

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-20">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">

                <BackToGroup />

                <GroupSubNav base="/technical-interest-groups/psnypg" />

                <motion.h1
                    className="text-3xl font-bold text-green-700 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    PSN-YPG - Young Pharmacists Group
                </motion.h1>

                <p className="text-gray-700 mb-6">
                    PSN-YPG represents the voice of early-career pharmacists in Nigeria.
                    The group focuses on mentorship, innovation, and leadership development
                    to prepare the next generation of pharmacy professionals.
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Career guidance and skill development</li>
                    <li>Pharmacy innovation and entrepreneurship</li>
                    <li>Networking events and youth leadership programs</li>
                </ul>
            </div>
        </main>
    )
}
