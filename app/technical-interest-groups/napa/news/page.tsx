import { GroupNewsList } from "../../components/GroupNewsTemplate"
import getNewsByGroup from "../../get_news"

const newsItems = await getNewsByGroup("NAPA")


export default async function NApaNewsPage() {
    return (
            <GroupNewsList
                group="NAPA"
                newsItems={newsItems}
                basePath="/technical-interest-groups/napa"
            />
        )
}
