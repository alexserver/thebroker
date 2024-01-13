import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import { getTickerEod } from '~/api/fake';
import TickerEOD from '~/components/TickerEOD';

describe('TickerEOD', () => {
  test('it renders', async () => {
    const symbol = 'APPL';
    const date = format(new Date(), 'yyyy-MM-dd');
    const eod = await getTickerEod({ symbol, date });
    const ComponentProps = {
      data: eod,
      date,
      onDateChange: () => {},
    };
    render(<TickerEOD {...ComponentProps} />);
    expect(screen.queryByText('End of the day details')).toBeVisible();
    expect(screen.getByLabelText('Date:')).toBeVisible();
    expect(screen.getByLabelText('Date:')).toHaveValue(date);
  });
});
