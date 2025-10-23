import { GroupNewsList } from "../../components/GroupNewsTemplate"
import getNewsByGroup from "../../get_news"


const newsItems = await getNewsByGroup("PSNYPG")

export default function PSNYPGNewsPage() {
    return (
            <GroupNewsList
                group="PSNYPG"
                newsItems={newsItems}
                basePath="/technical-interest-groups/psnypg"
            />
        )
}
