"use client"

import { motion } from "framer-motion"
import { Handshake } from 'lucide-react';
import { FaHandshake } from "react-icons/fa";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-28 px-6 mt-16">
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-blue-900"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Pharmaceutical Society of Nigeria (PSN), <br/>Akwa Ibom State
            </motion.h1>

            <div className="flex flex-col items-center justify-center text-center">
                <motion.p
                    className="text-base md:text-xl text-gray-600 italic mb-3"
                    animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    As men of honour, we join hands
                </motion.p>

                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <FaHandshake size={30} className="text-gray-600" />
                </motion.div>
            </div>


            {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <Link href="/auth/register">
                    <Button className="px-6 py-3 text-lg rounded-xl shadow-md bg-green-600 hover:bg-green-700 text-white transition">
                        Get Started
                    </Button>
                </Link>
            </motion.div> */}
        </section>
    )
}
