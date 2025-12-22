import { endpoints } from "@/lib/serverApi";

async function getNewsByGroup(group: string): Promise<NewsArticle[]> {
  const res = await fetch(
    `${endpoints.news}?group=${group}`,
    { cache: "no-store" } // fetch fresh data each time
  );
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default getNewsByGroup;
