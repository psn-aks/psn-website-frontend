import { Metadata } from "next"

import { generateGroupNewsMetadata, GroupNewsList } from "../../components/GroupNewsTemplate"
import getNewsByGroup from "../../get_news"

const newsItems = await getNewsByGroup("ACPN")

export default async function ACPNNewsPage() {

    
    return (
        <GroupNewsList
            group="ACPN"
            newsItems={newsItems}
            basePath="/technical-interest-groups/acpn"
        />
    )
}


// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//     const { slug } = await params

//     return generateGroupNewsMetadata({
//         group: "ACPN",
//         slug,
//         newsItems,
//     })

// }