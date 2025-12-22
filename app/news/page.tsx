"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { formatDate } from "@/utils/format_date";
import { endpoints } from "@/lib/serverApi";

type NewsItem = {
    slug: string;
    title: string;
    content: string;
    created_at: string;
};

export default function PSNNews() {
    const ITEMS_PER_PAGE = 5;

    const [articles, setArticles] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    // 🔹 Fetch news from backend
    useEffect(() => {
        async function fetchArticles() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${endpoints.news}?page=${currentPage}&limit=${ITEMS_PER_PAGE}&q=${encodeURIComponent(
                        search
                    )}`
                );

                if (!res.ok) {
                    throw new Error("Failed to load news");
                }

                const data = await res.json();

                setArticles(data.items || []);
                setTotal(data.total || 0);
            } catch (err) {
                console.error(err);
                setError("Failed to load news");
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [currentPage, search]);

    // 🔹 Reset page when searching (debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <main className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-gray-100 shadow-md hover:shadow-lg rounded-2xl p-8">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
                    News & Activities
                </h1>

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-500">
                        Loading news…
                    </p>
                )}

                {/* Error */}
                {error && (
                    <p className="text-center text-red-600">
                        {error}
                    </p>
                )}

                {/* Articles */}
                {!loading && articles.length === 0 && !error && (
                    <p className="text-center text-gray-500">
                        No news articles found.
                    </p>
                )}

                <div className="space-y-6">
                    {articles.map((item, i) => (
                        <motion.div
                            key={item.slug}
                            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/news/${item.slug}`}>
                                <h2 className="text-2xl font-semibold text-blue-700 mb-2 hover:underline">
                                    {item.title}
                                </h2>
                            </Link>

                            <p className="text-gray-500 text-sm mb-3">
                                {formatDate(item.created_at)}
                            </p>

                            <p className="text-gray-700">
                                {item.content
                                    .replace(/<[^>]+>/g, "")
                                    .slice(0, 220)}
                                …
                            </p>

                            <Link
                                href={`/news/${item.slug}`}
                                className="text-blue-600 font-medium mt-3 inline-block hover:underline"
                            >
                                Read more →
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-md disabled:opacity-40"
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === i + 1
                                        ? "bg-blue-800 text-white"
                                        : "border"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(p + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-md disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
