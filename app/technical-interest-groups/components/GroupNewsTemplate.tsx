import Link from "next/link"
import { Metadata } from "next"

import GroupSubNav from "@/app/technical-interest-groups/components/GroupSubNav"
import BackToGroup from "@/app/technical-interest-groups/components/BackToGroup"
import { formatDate } from "@/utils/format_date"


export async function generateGroupNewsMetadata({
    group,
    slug,
    newsItems,
}: {
    group: string
    slug: string
    newsItems: NewsArticle[]
}): Promise<Metadata> {
    
    const article = newsItems.find((n) => n.slug === slug)
    if (!article) return { title: "Article not found" }

    return {
        title: `${article.title} | ${group} News`,
        description: article.content.slice(0, 160),
        openGraph: {
            title: article.title,
            description: article.content.slice(0, 160),
            type: "article",
        },
    }
}

export function GroupNewsList({
    group,
    newsItems,
    basePath,
}: {
    group: string
    newsItems: NewsArticle[]
    basePath: string
}) {
    const groupUrl = `/technical-interest-groups/${group.toLowerCase()}`
    
    return (


        <main className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">

                <BackToGroup />

                <GroupSubNav base={groupUrl} />

                <h1 className="text-3xl font-bold text-blue-800 mb-10 text-center">
                    {group} News & Activities
                </h1>

                {newsItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">
                        No news or articles yet. Please check back later.
                    </p>
                ) : (<div className="space-y-6">
                    {newsItems.map((item, i) => (
                        <div
                            key={item.slug}
                            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition ">
                            <Link href={`${basePath}/news/${item.slug}`}
                                className="visited:bg-amber-900"
                            >
                                <h2 className="text-2xl font-semibold text-blue-700 mb-2 ">
                                    {item.title}
                                </h2>
                            </Link>
                            <p className="text-gray-500 text-sm mb-3">{formatDate(item.created_at)}</p>
                            <p className="text-gray-700">
                                {item.content.replace(/<[^>]+>/g, '').slice(0, 250)}...
                            </p>
                            <Link
                                href={`${basePath}/news/${item.slug}`}
                                className="text-blue-600 font-medium mt-3 inline-block hover:underline visited:bg-amber-900"
                            >
                                Read more →
                            </Link>
                        </div>
                    ))}
                </div>)
                }
            </div>
        </main>
    )
}



