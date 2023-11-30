import Chart from '~/components/Chart';
import { render } from '@testing-library/react';
import { getTickerHistorical } from '~/api/fake';
import { format, subDays } from 'date-fns';

describe('Main::', () => {
  const resizeObserverMock = jest.fn((callback) => {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  });

  beforeAll(() => {
    window.ResizeObserver = resizeObserverMock;
  });

  afterEach(() => {
    resizeObserverMock.mockClear();
  });

  test('Chart render', async () => {
    const from = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    const to = format(new Date(), 'yyyy-MM-dd');
    const historical = await getTickerHistorical({
      symbol: 'APPL',
      date_from: from,
      date_to: to,
    });
    const ComponentProps = {
      data_key: 'open',
      data: historical.data,
    };
    const { container } = render(<Chart {...ComponentProps} />);
    expect(
      container.querySelector('.recharts-responsive-container')
    ).toBeVisible();
  });
});
