
async function getNewsByGroup(group: string): Promise<NewsArticle[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/news?group=${group}`,
    { cache: "no-store" } // fetch fresh data each time
  );
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}


export default getNewsByGroup;