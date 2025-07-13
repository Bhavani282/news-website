import { render, screen } from '@testing-library/react';
import Header from '../Header';
process.env.NEXT_PUBLIC_NEWS_API_KEY = 'testkey';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Header component', () => {
  it('renders site title', () => {
    render(<Header language="en" setLanguage={() => {}} />);
    const title = screen.getByText(/news web/i);
    expect(title).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<Header language="en" setLanguage={() => {}} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
  });
});
