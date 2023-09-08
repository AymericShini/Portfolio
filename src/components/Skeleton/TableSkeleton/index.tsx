import { Skeleton, TableCell, TableRow } from '@mui/material';

type Props = {
  columns: any[];
  nbRows?: number;
};

const TableSkeleton = ({ columns, nbRows = 5 }: Props) => (
  <>
    {[...Array(nbRows)].map((_e, index) => (
      <TableRow key={`row-${index}`}>
        {columns.map(column => (
          <TableCell key={column.id}>
            <Skeleton />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

export default TableSkeleton;
