// src/utils/api.ts
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

console.log("API KEY:", API_KEY);
const BASE_URL = 'https://newsapi.org/v2';



export const searchNews = async (query: string, language: string = 'en') => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  if (!apiKey) throw new Error("Missing NEWS_API_KEY");

  const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=${language}&apiKey=${apiKey}`);
  const data = await res.json();
  return data;
};

export const fetchTopHeadlines = async (
  query: string = 'news',
  language: string = 'en',
  page: number = 1,
  pageSize: number = 10
) => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      q: query, 
      apiKey: API_KEY,
      page,
      pageSize,
      language,
      sortBy: 'publishedAt',
    },
  });
  return response.data;
};


export const fetchNewsByCategory = async (
  category: string,
  page: number = 1,
  language: string = 'en'
) => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      q: category,
      apiKey: API_KEY,
      page,
      pageSize: 10,
      language,
      sortBy: 'publishedAt',
    },
  });
  return response.data;
};



// src/utils/api.ts




