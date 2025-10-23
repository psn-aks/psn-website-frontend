import { GroupNewsDetail } from "@/app/technical-interest-groups/components/GroupNewsDetailTemplate"

export default async function EldersForumNewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <GroupNewsDetail
            slug={slug}
            basePath="/technical-interest-groups/elders-forum"
        />
    )
}


// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//     const { slug } = await params
    
//     return generateGroupNewsMetadata({
//         group: "Elders Forum",
//         slug,
//         newsItems,
//     })
    
// }


// const res = await fetch(`${process.env.API_URL}/news/${slug}`, { cache: "no-store" })
// const article = await res.json()
