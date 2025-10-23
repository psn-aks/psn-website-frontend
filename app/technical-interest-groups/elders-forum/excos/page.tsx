"use client"

import { motion } from "framer-motion"
import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"
import BackToGroup from "@/app/technical-interest-groups/components/BackToGroup"

export default function EldersForumExcosPage() {
    const excos = [
        { name: "Dr. Chika Obi", position: "Chairperson" },
        { name: "Mr. Ahmed Yusuf", position: "Vice Chairperson" },
        { name: "Mrs. Tolu Bamidele", position: "Secretary" },
        { name: "Dr. Grace Opara", position: "Treasurer" },
    ]

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 text-center">
                <BackToGroup />
                <GroupSubNav base="/technical-interest-groups/elders-forum" />
                <motion.h1
                    className="text-3xl md:text-4xl font-bold text-blue-800 mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Elders Forum Executive Committee
                </motion.h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {excos.map((exco, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h3 className="text-xl font-semibold text-blue-700">{exco.name}</h3>
                            <p className="text-gray-600 mt-2">{exco.position}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
