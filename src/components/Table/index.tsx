'use client';

import { Paper, TableContainer, TableCell, TableBody, Table as TableMui } from '@mui/material';
import TableRow from './TableRow';
import TableHead from './TableHead';

import { TableColumnConfig, TableColumnsConfig } from 'shared/types/table';
import { useState } from 'react';

type Props = {
  tableColumns: TableColumnsConfig;
};

const Table = ({ tableColumns }: Props) => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState(tableColumns);

  const updateColumns = (columns: TableColumnsConfig) => {
    setColumns(columns);
  };

  console.log(`tableColumns :`, tableColumns);
  return (
    <Paper>
      <TableContainer>
        <TableMui>
          <TableHead columns={columns} updateColumns={updateColumns} />
          <TableBody>
            {rows.map(row => (
              <TableRow columns={columns} row={row} />
            ))}
          </TableBody>
        </TableMui>
      </TableContainer>
    </Paper>
  );
};

export default Table;
