"use client";

import Link from "next/link";
import { formatDate } from "@/utils/format_date";
import ShareBar from "./ShareBar";

export default function NewsContent({
    data,
    slug,
}: {
    data: NewsResponse;
    slug: string;
}) {
    const { article, related } = data;

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/news"
                    className="text-blue-600 font-medium hover:underline mb-6 inline-block"
                >
                    ← Back to News
                </Link>

                <h1 className="text-4xl font-bold text-blue-800 mb-3">
                    {article.title}
                </h1>

                <p className="text-gray-500 text-sm mb-6">
                    {formatDate(article.created_at)}
                </p>

                {article.image_url && (
                    <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full rounded-2xl shadow mb-8"
                    />
                )}

                <div
                    className="bg-white shadow-md rounded-2xl p-8 prose prose-lg mb-12"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <ShareBar title={article.title} slug={slug} />

                {related.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                            Related News
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {related.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/news/${item.slug}`}
                                    className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                                >
                                    <h3 className="font-semibold text-lg">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(item.created_at)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
