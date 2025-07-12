'use client';

import React, { createContext, useContext, useState } from 'react';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  content: string;
  publishedAt: string;
  author: string;
};

type NewsContextType = {
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article) => void;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <NewsContext.Provider value={{ selectedArticle, setSelectedArticle }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error('useNews must be used within NewsProvider');
  return context;
};
