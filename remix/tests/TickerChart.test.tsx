import TickerChart from '~/components/TickerChart';
import { render, screen } from '@testing-library/react';
import { getTickerHistorical } from '~/api/fake';
import { format, subDays } from 'date-fns';

jest.mock(
  '../app/components/Chart',
  () =>
    function Chart() {
      return <div data-testid="chart" />;
    }
);

describe('TickerChart', () => {
  test('it renders', async () => {
    const from = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    const to = format(new Date(), 'yyyy-MM-dd');
    const key = 'open';
    const historical = await getTickerHistorical({
      symbol: 'APPL',
      date_from: from,
      date_to: to,
    });
    const ComponentProps = {
      symbol: 'APPL',
      date_from: from,
      date_to: to,
      data_key: key,
      data: historical.data,
      onDataTypeChange: () => {},
      onDateFromChange: () => {},
      onDateToChange: () => {},
    };
    render(<TickerChart {...ComponentProps} />);
    expect(screen.queryByText(/APPL/i)).toBeInTheDocument();
    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(2);
    expect(screen.getByLabelText('From:')).toBeInTheDocument();
    expect(screen.getByLabelText('From:')).toHaveValue(from);
    expect(screen.getByLabelText('To:')).toBeInTheDocument();
    expect(screen.getByLabelText('To:')).toHaveValue(to);
    expect(screen.getByLabelText('Type:')).toBeInTheDocument();
    expect(screen.getByLabelText('Type:')).toHaveTextContent(/open/i);
  });
});
