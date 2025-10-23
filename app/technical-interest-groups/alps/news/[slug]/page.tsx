import { GroupNewsDetail } from "@/app/technical-interest-groups/components/GroupNewsDetailTemplate"


export default async function ALPSNewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <GroupNewsDetail
            slug={slug}
            basePath="/technical-interest-groups/alps"
        />
    )
}

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//     const { slug } = await params
    
//     return generateGroupNewsMetadata({
//         group: "ALPS",
//         slug,
//         newsItems,
//     })
    
// }


// const res = await fetch(`${process.env.API_URL}/news/${slug}`, { cache: "no-store" })
// const article = await res.json()
