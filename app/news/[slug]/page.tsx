"use client";

import { useState, useEffect } from "react";
import Link from "next/link"
import { useParams } from "next/navigation";
import { Share2 } from "lucide-react"
import { FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { formatDate } from "@/utils/format_date";
import ArticleSkeleton from "@/components/article/ArticleSkeleton";

import { API_BASE_URL, endpoints } from "@/app/config/api";


export default function NewsDetail() {

    const params = useParams();
    const slug = params?.slug as string;

    const [data, setData] = useState<NewsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const [shareUrl, setShareUrl] = useState("");

    // const shareUrl = `https://your-domain.com/news/${slug}`

    useEffect(() => {
        if (typeof window !== "undefined" && slug) {
            const url = `${window.location.origin}/news/${slug}`;
            setShareUrl(url);
        }
    }, [slug]);



    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(`${endpoints.news}/slug/${slug}`);
                if (!res.ok) throw new Error("Failed to load news item");
                const data = await res.json();
                setData(data);

            } catch (err) {
                console.error(err);
                alert("Error loading article data.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchNews();
    }, [slug]);

    if (loading) return <ArticleSkeleton />;
    
    
    if (!data || !data.article) return <p className="text-center py-10">Article not found.</p>;
    
    const { article, related } = data;



    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Link
                    href={`/news`}
                    className="text-blue-600 font-medium hover:underline mb-6 inline-block"
                >
                    ← Back to News
                </Link>

                <h1 className="text-4xl font-bold text-blue-800 mb-3">
                    {article.title}
                </h1>
                <p className="text-gray-500 text-sm mb-6">{formatDate(article.created_at)}</p>

                
                
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    {article.author && (
                        <div className="text-sm text-gray-700">
                            <span className="font-medium text-gray-900">
                                By {article.author}
                            </span>
                        </div>
                    )}
                    {article.tags && (
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {article.image_url && (
                    <div className="mb-8">
                        <img
                            src={`${API_BASE_URL}/${article.image_url}`}
                            alt={article.title}
                            className="w-full h-100 object-contain rounded-2xl shadow-md"
                        />
                    </div>
                )}


                <div className="bg-white shadow-md rounded-2xl p-8 text-gray-800 leading-relaxed mb-12 prose prose-lg "
                    dangerouslySetInnerHTML={{ __html: article.content }}
                >
                </div>

                <div className="flex items-center gap-4 mb-12">
                    <Share2 className="text-blue-600" size={18} />
                    <span className="text-gray-700 text-sm">Share this article:</span>
                    <div className="flex gap-3">
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                shareUrl
                            )}&text=${encodeURIComponent(article.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500 hover:text-sky-600"
                        >
                            <FaXTwitter size={20} />
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                shareUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-800"
                        >
                            <FaLinkedinIn size={20} />
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                                article.title + " " + shareUrl
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700"
                        >
                            <FaWhatsapp size={20} />
                        </a>
                    </div>
                </div>



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
                                    className="block bg-white rounded-xl shadow hover:shadow-md transition p-4"
                                >
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">{formatDate(item.created_at)}</p>
                                    <p className="text-gray-700 text-sm line-clamp-3">
                                        {item.content.replace(/<[^>]+>/g, '').slice(0, 120)}...
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