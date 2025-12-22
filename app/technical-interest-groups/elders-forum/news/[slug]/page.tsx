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
