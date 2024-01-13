import BackIcon from './icons/BackIcon';
import ForwardIcon from './icons/ForwardIcon';
import FirstIcon from './icons/FirstIcon';
import LastIcon from './icons/LastIcon';
import { Button, Box } from '@mui/joy';

export interface PagerProps {
  pageSize: number;
  currentPage: number;
  totalRows: number;
  visiblePages?: number;
  onPageNavigate: (page: number) => void;
}
export default function Pager({
  pageSize,
  currentPage,
  totalRows,
  visiblePages = 5,
  onPageNavigate,
}: PagerProps) {
  const maxPages = Math.floor(totalRows / pageSize);
  const pagesCount = visiblePages > maxPages ? maxPages : visiblePages;
  const fakeArray = new Array(pagesCount).fill(0);
  const FIRST_PAGE = 1;
  const LAST_PAGE = maxPages;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'flex-end',
        margin: '1em 0',
      }}
    >
      <Button
        color="neutral"
        title="First"
        disabled={currentPage === FIRST_PAGE}
        onClick={() => onPageNavigate(FIRST_PAGE)}
      >
        <FirstIcon width={16} height={16} />
      </Button>
      {currentPage > FIRST_PAGE && (
        <Button
          color="neutral"
          title="Previous"
          onClick={() => onPageNavigate(currentPage - 1)}
        >
          <BackIcon width={16} height={16} />
        </Button>
      )}

      {fakeArray.map((item, idx) => (
        <Button
          color="neutral"
          key={idx}
          title={`Page ${idx + 1}`}
          disabled={currentPage === idx + 1}
          onClick={() => onPageNavigate(idx + 1)}
        >
          {idx + 1}
        </Button>
      ))}

      {currentPage < pagesCount && (
        <Button
          color="neutral"
          title="Next"
          onClick={() => onPageNavigate(currentPage + 1)}
        >
          <ForwardIcon width={16} height={16} />
        </Button>
      )}

      <Button
        color="neutral"
        title="Last"
        disabled={currentPage === LAST_PAGE}
        onClick={() => onPageNavigate(LAST_PAGE)}
      >
        <LastIcon width={16} height={16} />
      </Button>
    </Box>
  );
}
