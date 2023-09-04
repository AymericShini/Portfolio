import Table from 'components/Table';
import { tableConstants } from './constants';
import { Box } from '@mui/material';

function Manga() {
  return (
    <Box>
      z
      <Table tableColumns={tableConstants.tableColumns} />
    </Box>
  );
}

export default Manga;
