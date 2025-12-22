"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { endpoints } from "@/lib/serverApi";

type NewsItem = {
    _id: string;
    slug: string;
    title: string;
    author?: string;
};

export default function NewsListPage() {
    const router = useRouter();

    const ITEMS_PER_PAGE = 10;

    const [articles, setArticles] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    // 🔹 Fetch articles (pagination + search)
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

    async function handleDelete(slug: string) {
        if (!confirm("Delete this article?")) return;

        try {
            await fetch(`${endpoints.news}/slug/${slug}`, {
                method: "DELETE",
            });

            // refetch current page if empty
            if (articles.length === 1 && currentPage > 1) {
                setCurrentPage((p) => p - 1);
            } else {
                setArticles((prev) =>
                    prev.filter((a) => a.slug !== slug)
                );
                setTotal((t) => t - 1);
            }
        } catch (err) {
            alert("Failed to delete article");
            console.error(err);
        }
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold text-blue-900">
                    News Articles
                </h1>

                <Button
                    onClick={() => router.push("/admin/news/add")}
                    className="bg-green-600 text-white"
                >
                    + New Article
                </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by title or content..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>

            {/* Loading / Error */}
            {loading && (
                <p className="text-center py-10 text-gray-500">
                    Loading articles…
                </p>
            )}

            {error && (
                <p className="text-center text-red-500 py-6">
                    {error}
                </p>
            )}

            {/* Table */}
            {!loading && articles.length === 0 && !error && (
                <p className="text-gray-500 italic text-center">
                    No articles found.
                </p>
            )}

            {!loading && articles.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-t">
                        <thead className="bg-blue-100 text-blue-900">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Author</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((a) => (
                                <tr
                                    key={a._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3 font-medium">
                                        {a.title}
                                    </td>
                                    <td className="p-3">
                                        {a.author || "—"}
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                router.push(
                                                    `/admin/news/edit/${a.slug}`
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="bg-red-500"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(a.slug)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                    >
                        Prev
                    </Button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <Button
                            key={i}
                            variant={
                                currentPage === i + 1
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((p) =>
                                Math.min(p + 1, totalPages)
                            )
                        }
                    >
                        Next
                    </Button>
                </div>
            )}
        </main>
    );
}
