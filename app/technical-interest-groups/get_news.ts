import { endpoints } from "@/lib/serverApi";

async function getNewsByGroup(group: string): Promise<NewsArticle[]> {
  const res = await fetch(
    `${endpoints.news}?group=${group}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch news");
  const data: UpdatedNewsArticle = await res.json();

  const newsItem = data.items;
  return newsItem;
}

export default getNewsByGroup;
