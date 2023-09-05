import { Box, Button, Grid, Stack } from '@mui/material';
import Table from 'components/Table';
import { tableConstants } from './constants';

function Manga() {
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <h1>Using Material UI with Next.js 13</h1>
        <Stack direction="row" columnGap={1}>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </Grid>
      <Table tableColumns={tableConstants.tableColumns} />
    </Box>
  );
}

export default Manga;
