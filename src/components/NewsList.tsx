import NewsCard from './NewsCard';

type Props = {
  articles: Array<{
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    content: string;
    publishedAt: string;
    author: string;
  }>;
};

const NewsList = ({ articles }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {articles.map((article, index) => (
      <NewsCard key={index} article={article} />
    ))}
  </div>
);

export default NewsList;
