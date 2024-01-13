import TickerMainInfo from '../app/components/TickerMainInfo';
import { render, screen } from '@testing-library/react';

describe('TickerMainInfo', () => {
  test('it renders', () => {
    const TickerProps = {
      symbol: 'APPL',
      name: 'Apple',
      stockex: {
        country: 'USA',
        name: 'NASDAQ Stock Exchange',
        acronym: 'NASDAQ',
      },
    };
    render(<TickerMainInfo {...TickerProps} />);
    expect(screen.queryByText(TickerProps.symbol)).toBeVisible();
    expect(screen.queryByText(TickerProps.name)).toBeVisible();
    expect(screen.queryByText(TickerProps.stockex.name)).toBeVisible();
    expect(screen.queryByText(TickerProps.stockex.acronym)).toBeVisible();
    expect(screen.queryByText(TickerProps.stockex.country)).toBeVisible();
    // screen.debug();
  });
});
