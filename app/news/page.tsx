"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { formatDate } from "@/utils/format_date"

export default function PSNNews() {

    const router = useRouter()
    const [articles, setArticles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        async function fetchArticles() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/news`)
                const data = await res.json()

                setArticles(Array.isArray(data) ? data : [])
            } catch (err) {
                setError("Failed to load news")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchArticles()
    }, [])


    return (
        <main className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">



                <h1 className="text-3xl font-bold text-blue-800 mb-10 text-center">
                    News & Activities
                </h1>

                <div className="space-y-6">
                    {articles.map((item, i) => (
                        <motion.div
                            key={item.slug}
                            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition "
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/news/${item.slug}`}
                                className="visited:bg-amber-900"
                            >
                                <h2 className="text-2xl font-semibold text-blue-700 mb-2 ">
                                    {item.title}
                                </h2>
                            </Link>
                            <p className="text-gray-500 text-sm mb-3">{formatDate(item.created_at)}</p>
                            <p className="text-gray-700"
                                dangerouslySetInnerHTML={{ __html: item.content.slice(0, 250) }}>
                            </p>
                            <Link
                                href={`/news/${item.slug}`}
                                className="text-blue-600 font-medium mt-3 inline-block hover:underline visited:bg-amber-900"
                            >
                                Read more →
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}