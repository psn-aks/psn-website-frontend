import { GroupNewsList } from "../../components/GroupNewsTemplate"

import getNewsByGroup from "../../get_news"

const newsItems = await getNewsByGroup("Elders Forum")

export default async function ELDERSFORUMNewsPage() {
    return (
            <GroupNewsList
                group="Elders Forum"
                newsItems={newsItems}
                basePath="/technical-interest-groups/elders-forum"
            />
        )
}
