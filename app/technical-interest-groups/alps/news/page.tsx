import { GroupNewsList } from "../../components/GroupNewsTemplate"

import getNewsByGroup from "../../get_news"

const newsItems = await getNewsByGroup("ALPS")


export default async function ALPSNewsPage() {
    return (
            <GroupNewsList
                group="ALPS"
                newsItems={newsItems}
                basePath="/technical-interest-groups/alps"
            />
        )
}
