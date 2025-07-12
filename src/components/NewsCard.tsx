'use client';

import { useNews } from '../context/NewsContext';
import Link from 'next/link';

type Props = {
  article: {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    content: string;
    publishedAt: string;
    author: string;
  };
};

const NewsCard = ({ article }: Props) => {
  const { setSelectedArticle } = useNews();

  const handleReadMore = () => {
    setSelectedArticle(article);
  };

  return (
    <div className="border rounded-md p-4 mb-4 shadow hover:shadow-lg transition">
      <img src={article.urlToImage || '/placeholder.jpg'} alt={article.title} className="w-full h-48 object-cover mb-4 rounded" />
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="mb-2">{article.description}</p>
      <Link href="/news/article">
        <button onClick={handleReadMore} className="text-blue-500 cursor-po" >
          Read More
        </button>
      </Link>
    </div>
  );
};

export default NewsCard;
