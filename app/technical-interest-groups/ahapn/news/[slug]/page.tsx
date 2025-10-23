import { Metadata } from "next"

import { generateGroupNewsMetadata } from "@/app/technical-interest-groups/components/GroupNewsTemplate"
import getNewsByGroup from "@/app/technical-interest-groups/get_news"
import { GroupNewsDetail } from "@/app/technical-interest-groups/components/GroupNewsDetailTemplate"


const newsItems = await getNewsByGroup("AHAPN")


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    
    return generateGroupNewsMetadata({
        group: "AHAPN",
        slug,
        newsItems,
    })
    
}

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
