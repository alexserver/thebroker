import { Box, Button, FormLabel, Input } from '@mui/joy';
import { Form } from '@remix-run/react';

export default function SearchBar() {
  return (
    <Form action="/" method="get">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          margin: '2em 0',
          width: '100%',
        }}
      >
        <FormLabel htmlFor="searchbar">Ticker Symbol or Ticker Name</FormLabel>
        <Input id="searchbar" name="s" sx={{ flexGrow: 1 }} />
        <Button type="submit">Search</Button>
      </Box>
    </Form>
  );
}
