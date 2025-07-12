'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchNews } from '../../api/api';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import NewsList from '../../components/NewsList';
import Header from '../../components/Header';

// ✅ Define Article type
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  source: { name: string };
  content: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';

  const [language, setLanguage] = useState('en');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!q) return;
      try {
        setLoading(true);
        const data = await searchNews(q, language);
        setArticles(data.articles || []);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}&lang=${language}`);
    }
    fetchSearchResults();
  }, [language, q, router]);

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />
      <main className="p-4">
        <h1 className="text-xl flex item-center justify-center text-black font-bold mb-4">
          Search results for: {q}
        </h1>
        {loading && <Loader />}
        {error && <Error message={error} />}
        {!loading && !error && Array.isArray(articles) && articles.length > 0 && (
          <NewsList articles={articles} />
        )}
        {!loading && !error && Array.isArray(articles) && articles.length === 0 && (
          <p>No results found.</p>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
