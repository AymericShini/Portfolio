import {
  Box,
  TableFooter as MUITableFooter,
  TableRow as MUITableRow,
  TableCell,
} from '@mui/material';

import { TableColumnsConfig, TableTotals } from 'shared/types/table';

type Props = {
  totals: TableTotals;
  columns: TableColumnsConfig;
};

const TableFooter = ({ totals, columns: authorizedColumns }: Props) => {
  return (
    <MUITableFooter sx={{ position: 'sticky', left: '0', bottom: '0' }}>
      <MUITableRow>
        <TableCell>Totals:</TableCell>
        {totals.map(total => (
          <TableCell key={total.id}>
            <Box>
              <span>{total.value?.toLocaleString()}</span>
            </Box>
          </TableCell>
        ))}
      </MUITableRow>
    </MUITableFooter>
  );
};

export default TableFooter;
