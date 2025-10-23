// components/ChairmanSpeech.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ChairmanSpeech() {
    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* 🖼 Chairman Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/3 flex justify-center"
                >
                    <div className="relative w-60 h-60 rounded-full overflow-hidden shadow-lg border-4 border-green-600">
                        <Image
                            src="/images/logo.png" 
                            alt="Chairman of the Association"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>

                {/* 💬 Speech Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-2/3"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                        Message from the Chairman
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                        Dear colleagues and friends,
                        <br />
                        <br />
                        It gives me great pleasure to welcome you to our official platform -
                        a space built for collaboration, innovation, and professional growth.
                        As pharmacists, our role in advancing healthcare cannot be overstated.
                        Together, we can elevate standards, support one another, and leave
                        a legacy of excellence for future generations.
                        <br />
                        <br />
                        Let us continue to work with integrity, passion, and unity in service
                        to our communities.
                    </p>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-green-700">
                            Pharm. Ukeme Wilson
                        </h3>
                        <p className="text-gray-500 text-sm">Chairman, PSN, Akwa Ibom</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
