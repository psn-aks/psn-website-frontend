import { GroupNewsDetail } from "@/app/technical-interest-groups/components/GroupNewsDetailTemplate"



export default async function NAIPNewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return (
        <GroupNewsDetail
            slug={slug}
            basePath="/technical-interest-groups/naip"
        />
    )
}

    // export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    //     const { slug } = await params
        
    //     return generateGroupNewsMetadata({
    //         group: "NAIP",
    //         slug,
    //         newsItems,
    //     })
        
    // }

// const res = await fetch(`${process.env.API_URL}/news/${slug}`, { cache: "no-store" })
// const article = await res.json()
