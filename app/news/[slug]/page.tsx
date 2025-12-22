import { notFound } from "next/navigation";
import { endpoints } from "@/lib/serverApi";
import NewsContent from "./components/NewsContent";
import { WEB_DOMAIN_URL } from "@/app/config/base";

async function getNews(slug: string) {
    const res = await fetch(`${endpoints.news}/slug/${slug}`, {
        cache: "no-store",
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch article");

    return res.json();
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getNews(slug);

    if (!data?.article) {
        return {
            title: "Article Not Found | PSN Akwa Ibom",
        };
    }

    return {
        title: data.article.title,
        description: data.article.excerpt || "PSN Akwa Ibom News",
        openGraph: {
            title: data.article.title,
            url: `${WEB_DOMAIN_URL}/news/${slug}`,
        },
    };
}

/* ---------------- PAGE ---------------- */
export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getNews(slug);

    if (!data || !data.article) {
        notFound();
    }

    return <NewsContent data={data} slug={slug} />;
}
