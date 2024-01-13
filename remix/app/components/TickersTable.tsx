import { Link, Table } from '@mui/joy';

interface TickersTableProps {
  data: Array<any>; //temporary until we resolve the type of data
}
export default function TickersTable({ data }: TickersTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Stock Ex Acronym</th>
          <th>Stock Ex Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((ticker: any, index) => (
          <tr key={index}>
            <td>
              <Link href={`/${ticker.symbol}`}>{ticker.symbol}</Link>
            </td>
            <td>
              <Link color="neutral" href={`/${ticker.symbol}`}>
                {ticker.name}
              </Link>
            </td>
            <td>
              <Link color="neutral" href={`/${ticker.symbol}`}>
                {ticker.stock_exchange?.acronym}
              </Link>
            </td>
            <td>
              <Link color="neutral" href={`/${ticker.symbol}`}>
                {ticker.stock_exchange?.country}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
