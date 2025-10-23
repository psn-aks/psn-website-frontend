"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTA() {
    return (
        <section className="bg-green-600 py-20 text-center text-white">
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Ready to Transform Your Pharmacy Workflow?
            </motion.h2>
            <Link href="/auth/register">
                <Button className="bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-green-100 transition">
                    Join Now
                </Button>
            </Link>
        </section>
    )
}
