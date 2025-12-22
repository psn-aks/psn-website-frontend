"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { endpoints } from "@/lib/serverApi";

import { API_BASE_URL } from "@/lib/clientApi";

interface Ad {
    id: number
    title: string
    description: string
    image_url?: string
    link?: string
    start_date?: string
    end_date?: string
}

export default function RunningAdvertsCarousel() {
    const [ads, setAds] = useState<Ad[]>([])
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        async function loadAds() {
            try {
                const res = await fetch(`${endpoints.adverts}?only_active=true`)
                const data: Ad[] = await res.json()

                const now = new Date()

                // Filter active adverts (with valid date range)
                const activeAds = data.filter((ad) => {
                    const start = ad.start_date ? new Date(ad.start_date) : null
                    const end = ad.end_date ? new Date(ad.end_date) : null

                    // If both dates are valid, ensure current time is between them
                    if (start && end) return now >= start && now <= end
                    // If only start date exists
                    if (start && !end) return now >= start
                    // If only end date exists
                    if (!start && end) return now <= end
                    // If no dates given, treat as always active
                    return true
                })

                setAds(activeAds)
            } catch (err) {
                console.error("Failed to load adverts:", err)
            }
        }

        loadAds()
    }, [])

    // Auto-slide logic
    useEffect(() => {
        if (paused || ads.length === 0) return
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % ads.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [paused, ads])

    const nextAd = () => setCurrent((prev) => (prev + 1) % ads.length)
    const prevAd = () => setCurrent((prev) => (prev - 1 + ads.length) % ads.length)

    if (ads.length === 0) {
        return (
            <section className="py-20 bg-gray-50 text-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">Running Adverts</h2>
                <p className="text-gray-500">No active adverts at the moment.</p>
            </section>
        )
    }

    const ad = ads[current]

    return (
        <section
            className="relative py-20 bg-gray-50"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10">
                    Running Adverts
                </h2>

                <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
                    <AnimatePresence mode="wait">
                        <motion.a
                            key={ad.id}
                            href={ad.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6 }}
                            className="block"
                        >
                            <div className="relative w-full h-72 sm:h-96 bg-gray-200">
                                <Image
                                    src={
                                        ad.image_url
                                            ? ad.image_url.startsWith("http")
                                                ? ad.image_url
                                                : `${API_BASE_URL}/${ad.image_url.replace(/\\/g, "/")}`
                                            : "/fallback-news.jpg"
                                    }
                                    alt={ad.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {ad.title}
                                </h3>
                                <p className="text-gray-600">{ad.description}</p>
                            </div>
                        </motion.a>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevAd}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextAd}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                    {ads.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full transition ${idx === current ? "bg-blue-600" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
