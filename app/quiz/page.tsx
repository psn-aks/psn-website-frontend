"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { endpoints } from "@/lib/serverApi";

interface Topic {
    _id: string;
    title: string;
    slug: string;
    description?: string;
}

export default function QuizTopicsPage() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTopics() {
            const res = await fetch(`${endpoints.quiz}/topics`);
            const data = await res.json();
            setTopics(data);
            setLoading(false);
        }
        fetchTopics();
    }, []);

    if (loading) return <p className="text-center py-10">Loading topics…</p>;

    return (
        <main className="min-h-screen bg-gray-100 py-20 px-4">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold text-center mb-10 text-blue-900">
                    Pick your Weapon 🥷
                </h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {topics.map((t) => (
                        <Link
                            key={t._id}
                            href={`/quiz/${t.slug}`}
                            className="p-6 rounded-xl  bg-gray-50 shadow-md hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">
                                {t.title}
                            </h2>
                            {t.description && (
                                <p className="text-gray-600">{t.description}</p>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
