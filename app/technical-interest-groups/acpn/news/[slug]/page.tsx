import { GroupNewsDetail } from "@/app/technical-interest-groups/components/GroupNewsDetailTemplate"


export default async function ACPNNewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <GroupNewsDetail
            slug={slug}
            basePath="/technical-interest-groups/acpn"
        />
    )
}


// const res = await fetch(`${process.env.API_URL}/news/${slug}`, { cache: "no-store" })
// const article = await res.json()
