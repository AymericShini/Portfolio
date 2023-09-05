'use client';

import { Paper, TableBody, TableContainer, Table as TableMui } from '@mui/material';
import TableHead from './TableHead';
import TableRow from './TableRow';

import { useState } from 'react';
import { TableColumnsConfig } from 'shared/types/table';

type Props = {
  tableColumns: TableColumnsConfig;
};

const Table = ({ tableColumns }: Props) => {
  const [rows, setRows] = useState<any[]>([
    { name: 'aze', url: 'aze', chapitre: '54', favorite: true },
    { name: 'cvdf', url: 'qsd', chapitre: '56', favorite: true },
    { name: 'azer', url: 'hj', chapitre: '45', favorite: false },
    { name: 'fze', url: 'qsd', chapitre: '213', favorite: false },
  ]);
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
