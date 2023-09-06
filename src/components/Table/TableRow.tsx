import { TableRow as MUITableRow, TableCell } from '@mui/material';
import { TableColumnsConfig } from 'shared/types/table';
import GenericActionCell from './ActionCell/GenericCells';

type Props = {
  columns: TableColumnsConfig;
  row: Record<string, any>;
};

const TableRow = ({ columns, row }: Props) => (
  <MUITableRow hover>
    {columns.map(column => {
      const value = row[column.id];
      return (
        <TableCell key={column.id}>
          <GenericActionCell row={row} column={column} value={value} />
        </TableCell>
      );
    })}
  </MUITableRow>
);

export default TableRow;
