import {
  json,
  type LoaderFunctionArgs,
  type LinksFunction,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { getTickers } from '~/api';
import styles from '~/styles/index.css';
import Pager, { type PagerProps } from '~/components/Pager';
import SearchBar from '~/components/SearchBar';
import TickersTable from '~/components/TickersTable';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: 'The Broker' },
    { name: 'description', content: 'US Stock Market' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const query = searchParams.get('s') ?? '';
  const limit = 20; // temporary hardcode
  const { pagination, data } = await getTickers({ limit, page, query });
  return json({ pagination, data });
}

export default function Index() {
  const { pagination, data } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pagerProps: Omit<PagerProps, 'onPageNavigate'> = {
    pageSize: pagination.limit,
    currentPage: Number(searchParams.get('page') ?? 1),
    totalRows: pagination.total,
    visiblePages: 5,
  };
  const gotoPage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };
  return (
    <div className="index-body">
      <h1 className="title">Stock Market Info</h1>
      <SearchBar />
      <TickersTable data={data} />
      <Pager {...pagerProps} onPageNavigate={gotoPage} />
    </div>
  );
}
