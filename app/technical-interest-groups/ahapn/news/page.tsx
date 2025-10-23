import { GroupNewsList } from "../../components/GroupNewsTemplate"
import getNewsByGroup from "../../get_news"


export default async function AHAPNNewsPage() {

    const newsItems = await getNewsByGroup("AHAPN")

    return (
        <GroupNewsList
            group="AHAPN"
            newsItems={newsItems}
            basePath="/technical-interest-groups/ahapn"
        />
    )
}
