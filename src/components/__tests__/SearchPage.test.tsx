import { render, screen } from '@testing-library/react';
import SearchPage from '../../app/search/page';
import * as api from '../../api/api';
import { NewsProvider } from '../../context/NewsContext';

process.env.NEXT_PUBLIC_NEWS_API_KEY = 'testkey';

// Mock the searchNews API call
jest.mock('../../api/api');

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => 'bitcoin', // mock query ?q=bitcoin
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('SearchPage', () => {
  it('renders and fetches search results', async () => {
    const mockArticles = [
      {
        title: 'Bitcoin hits high',
        url: '#',
        description: 'desc',
        urlToImage: '',
        publishedAt: '',
        author: '',
        source: { name: '' },
        content: '',
      },
    ];

    // Make sure the mocked API resolves with test data
    (api.searchNews as jest.Mock).mockResolvedValueOnce({ articles: mockArticles });

    render(
      <NewsProvider>
        <SearchPage />
      </NewsProvider>
    );

    // ✅ Use findByText instead of waitFor + getByText for async renders
    expect(await screen.findByText('Bitcoin hits high')).toBeInTheDocument();
  });
});
