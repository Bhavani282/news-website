'use client';

import { useNews } from '../../../context/NewsContext';
import Header from '../../../components/Header';

const NewsArticlePage = () => {
  const { selectedArticle } = useNews();

  if (!selectedArticle) {
    return (
      <div>
        <Header />
        <main className="p-4">
          <p>No article data available. Please go back and select an article.</p>
        </main>
      </div>
    );
  }

  const { title, description, content, urlToImage, publishedAt, author, url } = selectedArticle;

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        {urlToImage && <img src={urlToImage} alt={title} className="w-full max-h-[400px] object-cover mb-4 rounded" />}
        <p className="text-gray-600 mb-2">By {author || 'Unknown'} on {publishedAt}</p>
        <p className="mb-4">{description}</p>
        <p className="mb-4">{content}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          View Original Article
        </a>
      </main>
    </div>
  );
};

export default NewsArticlePage;
