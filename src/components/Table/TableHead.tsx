import { TableHead as MUITableHead, TableCell, TableRow } from '@mui/material';
import { TableColumnsConfig } from 'shared/types/table';

type Props = {
  columns: TableColumnsConfig;
  updateColumns: (columns: TableColumnsConfig) => void;
};

const TableHead = ({ columns, updateColumns }: Props) => (
  <MUITableHead>
    <TableRow>
      {/* <TableCell colSpan={columns.length + 1}> */}
      {/* <TableSetting columns={columns} updateColumns={updateColumns} /> */}
      {/* </TableCell> */}
    </TableRow>
    <TableRow>
      {columns.map(column => (
        <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>{column.label}</TableCell>
      ))}
    </TableRow>
  </MUITableHead>
);

export default TableHead;
