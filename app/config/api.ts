export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const endpoints = {
  news: `${API_BASE_URL}/api/v1/news`,
  adverts: `${API_BASE_URL}/api/v1/adverts`,
  pharmacists: `${API_BASE_URL}/api/v1/pharmacists`,
  contact: `${API_BASE_URL}/api/v1/contact`,
};
