'use client';

import { useEffect, useState } from 'react';
import { fetchTopHeadlines } from '../api/api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import NewsList from '../components/NewsList';
import Pagination from '../components/Pagination';
import Header from '../components/Header';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState('en');
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const getNews = async (selectedLang: string, pageNum: number) => {
    try {
      setLoading(true);
      const data = await fetchTopHeadlines('news', selectedLang, pageNum, pageSize);
      const articlesFetched = data.articles || [];
      console.log('Fetched articles:', articlesFetched.length);
      setArticles(articlesFetched);
      setHasMore(articlesFetched.length > 0);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // ✅ Fetch news when language or page changes
  useEffect(() => {
    getNews(language, page);
  }, [language, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />
      <main className="p-4">
        {loading && <Loader />}
        {error && <Error message={error} />}
        {!loading && !error && articles.length > 0 && (
          <>
            <NewsList articles={articles} />
            <Pagination currentPage={page} onPageChange={handlePageChange} disableNext={!hasMore} />
          </>
        )}
        {!loading && !error && articles.length === 0 && (
          <p>No news found for selected language.</p>
        )}
      </main>
    </div>
  );
}
