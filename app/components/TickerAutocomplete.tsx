import { Autocomplete, Box } from '@mui/joy';
import SearchIcon from './icons/SearchIcon';
import { useFetcher, useNavigate } from '@remix-run/react';
import { type SyntheticEvent, useRef, useState } from 'react';

interface AutocompleteOptions {
  options: Array<{
    label: string;
    value: string;
  }>;
}

export default function TickerAutocomplete() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(null);
  const onInputChange = (evt: SyntheticEvent, val: any, reason: string) => {
    setInputValue(val);
    fetcher.submit(ref.current);
    // if reason === clear, reset options
    if (reason === 'clear') {
      setSelectValue(null);
    }
  };
  const onTokenSelected = (evt: SyntheticEvent, val: any) => {
    const { symbol } = val;
    setSelectValue(val);
    if (symbol) {
      navigate(`/${symbol}`);
    }
    // navigate to that symbol baby
  };
  const { options } = (fetcher.data as AutocompleteOptions) ?? { options: [] };
  return (
    <fetcher.Form ref={ref} action="/ticker/search">
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: 400,
        }}
      >
        <Autocomplete
          startDecorator={<SearchIcon width={16} height={16} />}
          options={options}
          name="query"
          placeholder="Search a token by name or symbol"
          sx={{ flexGrow: 1 }}
          inputValue={inputValue}
          value={selectValue}
          onInputChange={onInputChange}
          onChange={onTokenSelected}
        />
      </Box>
    </fetcher.Form>
  );
}
