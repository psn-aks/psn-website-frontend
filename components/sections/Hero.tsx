"use client"

import { motion } from "framer-motion"
import { FaHandshake } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="flex flex-col items-center text-center py-28 px-6 mt-16 bg-gradient-to-b from-blue-50 to-white">
            <motion.span
                className="mb-4 px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Professional Excellence • Service • Unity
            </motion.span>

            <motion.h1
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-blue-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
            >
                Pharmaceutical Society of Nigeria <br />
                <span className="text-blue-700">(PSN), Akwa Ibom State</span>
            </motion.h1>

            <motion.p
                className="text-base md:text-xl text-gray-600 italic mt-4"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                As men of honour, we join hands
            </motion.p>

            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", }} 
                >
                <FaHandshake size={30} className="text-gray-600" />
            </motion.div>
        </section>

    )
}
