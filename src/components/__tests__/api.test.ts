import { fetchTopHeadlines } from '../../api/api';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
(global as any).BroadcastChannel = class {
  constructor() {}
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
};

const server = setupServer(
  http.get('https://newsapi.org/v2/top-headlines', () => {
    return HttpResponse.json({
      articles: [
        { title: 'Test News', url: 'https://example.com', description: 'desc', urlToImage: '', publishedAt: '', author: '', source: { name: '' }, content: '' },
      ],
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetchTopHeadlines returns articles', async () => {
  const data = await fetchTopHeadlines('news', 'en', 1, 10);
  expect(data.articles[0].title).toBe('Test News');
});
