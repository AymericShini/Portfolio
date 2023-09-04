import { TableCell, TableHead as MUITableHead, TableRow } from '@mui/material';
import { TableColumnsConfig } from 'shared/types/table';
import TableSetting from './TableSetting';

type Props = {
  columns: TableColumnsConfig;
  updateColumns: (columns: TableColumnsConfig) => void;
};

const TableHead = ({ columns, updateColumns }: Props) => {
  console.log(`columns :`, columns);
  return (
    <MUITableHead>
      <TableRow>
        <TableCell>
          {/* <TableSetting columns={columns} updateColumns={updateColumns} /> */}
        </TableCell>
      </TableRow>
      <TableRow>
        {columns.map(column => {
          console.log(`column  zzz:`, column);
          return <TableCell>{column.label}</TableCell>;
        })}
      </TableRow>
    </MUITableHead>
  );
};

export default TableHead;
