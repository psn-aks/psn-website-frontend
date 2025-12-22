interface NewsArticle {
  _id: string;
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

interface UpdatedNewsArticle {
  items: NewsArticle[];
  limit: number;
  page: number;
  total: number;
}

interface NewsResponse {
  article: NewsArticle;
  related: NewsArticle[];
}


