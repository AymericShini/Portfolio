import { Box, Button, Grid, Stack } from '@mui/material';
import Table from 'components/Table';
import { tableConstants } from './constants';

function Manga() {
  console.log(`tableConstants.tableColumns :`, tableConstants.tableColumns);
  return (
    <Box>
      <Grid container alignItems="left" justifyContent="left" direction="column">
        <h1>Manga List</h1>
      </Grid>
      <Table tableColumns={tableConstants.tableColumns} />
    </Box>
  );
}

export default Manga;
