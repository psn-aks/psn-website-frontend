import EditNewsClient from "./EditNewsClient";

async function getNewsItemBySlug(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/news/slug/${encodeURIComponent(slug)}`, {
        cache: "no-store", 
    });

    if (!res.ok) {
        throw new Error("Failed to fetch news article");
    }

    return res.json();
}

export default async function EditNewsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params; 
    const data = await getNewsItemBySlug(slug);
    const news = data.article; 

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4">
            <EditNewsClient news={news} />
        </main>
    );
}
