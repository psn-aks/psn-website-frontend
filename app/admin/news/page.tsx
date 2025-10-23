"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NewsListPage() {
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

    if (loading) return <p className="text-center py-10">Loading...</p>
    if (error) return <p className="text-center text-red-500">{error}</p>

    return (
        <main className="max-w-5xl mx-auto px-4 py-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-900">News Articles</h1>
                <Button onClick={() => router.push("/admin/news/add")}>+ New Article</Button>
            </div>

            {articles.length === 0 ? (
                <p className="text-gray-500 italic text-center">No articles yet.</p>
            ) : (
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
                            {articles.map((a: any) => (
                                <tr key={a.uid} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{a.title}</td>
                                    <td className="p-3">{a.author || "—"}</td>
                                    <td className="p-3 flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => router.push(`/admin/news/edit/${a.slug}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(a.uid)}
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
        </main>
    )

    async function handleDelete(uid: string) {
        if (!confirm("Delete this article?")) return
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/news/${uid}`, {
                method: "DELETE",
            })
            setArticles((prev) => prev.filter((a) => a.uid !== uid))
        } catch (err) {
            alert("Failed to delete")
            console.error(err)
        }
    }
}
