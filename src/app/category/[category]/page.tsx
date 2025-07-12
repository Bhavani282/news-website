'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { fetchNewsByCategory } from '../../../api/api';
import NewsList from '../../../components/NewsList';
import Header from '../../../components/Header';
import Pagination from '../../../components/Pagination';

// ✅ Define Article interface
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

const CategoryPage = () => {
  const params = useParams();
  const { category } = params as { category: string };
  const searchParams = useSearchParams();
  const router = useRouter();

  const [language, setLanguage] = useState('en');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [disableNext, setDisableNext] = useState(false);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 10;

  // ✅ Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // ✅ Fetch category news inside useEffect to avoid missing dependencies
  useEffect(() => {
    const getCategoryNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNewsByCategory(category, page, language);
        setArticles(data.articles || []);
        setDisableNext(!data.articles || data.articles.length < pageSize);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch category news');
      } finally {
        setLoading(false);
      }
    };

    // ✅ Update URL when language changes and fetch news
    router.push(`/category/${category}?page=${page}&lang=${language}`);
    getCategoryNews();
  }, [language, category, page, router]);

  const handlePageChange = (newPage: number) => {
    router.push(`/category/${category}?page=${newPage}&lang=${language}`);
  };

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />
      <main className="p-4">
        <h1 className="text-4xl bg-amber-300 rounded-xl p-3 flex-col md:flex-row flex items-center justify-center font-bold mb-4 capitalize">{category}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
            <NewsList articles={articles} />
            <Pagination currentPage={page} onPageChange={handlePageChange} disableNext={disableNext} />
          </>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
