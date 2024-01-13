import { render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import SearchBar from '~/components/SearchBar';

jest.mock('@remix-run/react', () => {
  const OriginalModule = jest.requireActual('@remix-run/react');
  return {
    ...OriginalModule,
    Form: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  };
});

describe('Searchbar', () => {
  test('it renders', async () => {
    render(<SearchBar />);
    expect(screen.getByLabelText(/ticker symbol/i)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Search' })).toBeVisible();
  });
});
