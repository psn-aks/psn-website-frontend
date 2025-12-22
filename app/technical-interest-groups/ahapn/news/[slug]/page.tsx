import { GroupNewsDetail } from "@/app/technical-interest-groups/components/GroupNewsDetailTemplate"


export default async function AHAPNNewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <GroupNewsDetail
            slug={slug}
            basePath="/technical-interest-groups/ahapn"
        />
    )
}


// const res = await fetch(`${process.env.API_URL}/news/${slug}`, { cache: "no-store" })
// const article = await res.json()
