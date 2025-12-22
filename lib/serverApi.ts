export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const endpoints = {
  news: `${API_BASE_URL}/news`,
  adverts: `${API_BASE_URL}/adverts`,
  pharmacists: `${API_BASE_URL}/pharmacists`,
  contact: `${API_BASE_URL}/contact`,
  quiz: `${API_BASE_URL}/quiz`,
};
