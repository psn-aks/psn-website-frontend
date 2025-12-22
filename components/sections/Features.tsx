"use client"

import { motion } from "framer-motion"
import { Pill, Stethoscope, Users, ShieldCheck } from "lucide-react"

const features = [
    { icon: <Pill size={40} />, title: "Advertise Here", desc: "Track stock, batch numbers, and expiry dates effortlessly." },
    { icon: <Stethoscope size={40} />, title: "Advertise Here", desc: "Digitally verify and process prescriptions instantly." },
    { icon: <Users size={40} />, title: "Advertise Here", desc: "Maintain secure patient profiles and history." },
    { icon: <ShieldCheck size={40} />, title: "Advertise Here", desc: "HIPAA-ready, safe, and reliable infrastructure." },
]

export default function Features() {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
                    Advertise with us
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="bg-green-300 p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex justify-center mb-4 text-blue-600">{f.icon}</div>
                            <h3 className="text-xl font-semibold text-center mb-2">{f.title}</h3>
                            <p className="text-gray-600 text-center">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
