interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  author?: string;
  content: string;
  tags: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
  group: string;
}

interface NewsResponse {
  article: NewsArticle;
  related: NewsArticle[];
}