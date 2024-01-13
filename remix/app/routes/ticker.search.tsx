import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { getTickers } from '~/api/fake';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get('query') ?? '';
  const { data } = await getTickers({ query, limit: 1000 });

  // transform data into a more readable option
  const options = data.map((item) => ({
    label: `(${item.symbol}) ${item.name}`,
    symbol: item.symbol,
  }));

  return json({ options });
}
