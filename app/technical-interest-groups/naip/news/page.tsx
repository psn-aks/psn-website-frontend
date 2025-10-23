import { GroupNewsList } from "../../components/GroupNewsTemplate"
import getNewsByGroup from "../../get_news"

const newsItems = await getNewsByGroup("NAIP")


export default async function NAIPNewsPage() {
    return (
            <GroupNewsList
                group="NAIP"
                newsItems={newsItems}
                basePath="/technical-interest-groups/naip"
            />
        )
}
