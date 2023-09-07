'use client';

import {
  Grid,
  Paper,
  TableBody,
  TableContainer,
  Table as TableMui,
  TablePagination,
} from '@mui/material';
import TableHead from './TableHead';
import TableRow from './TableRow';

import ExportJson from 'components/Json/ExportJson';
import ImportJson from 'components/Json/ImportJson';
import { useEffect, useState } from 'react';
import { TableColumnsConfig } from 'shared/types/table';

type Props = {
  tableColumns: TableColumnsConfig;
};

const Table = ({ tableColumns }: Props) => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState(tableColumns);
  const [count, setCount] = useState<number>(50);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setCount(rows.length);
  }, [rows]);

  const updateColumns = (columns: TableColumnsConfig) => {
    setColumns(columns);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => setPage(newPage);

  return (
    <Grid>
      <ImportJson setJson={setRows} />
      <Paper>
        {rows.length > 0 && (
          <>
            <TableContainer sx={{ height: '600px' }}>
              <TableMui sx={{ height: 'max-content' }}>
                <TableHead columns={columns} updateColumns={updateColumns} />
                <TableBody>
                  {rows &&
                    (rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : rows
                    ).map(row => <TableRow columns={columns} row={row} />)}
                </TableBody>
                {/* <TableFooter totals={columns} columns={columns} /> */}
              </TableMui>
            </TableContainer>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item alignSelf="center" pl={2}>
                <ExportJson jsonFile={rows} />
              </Grid>
              <Grid item alignSelf="center" pr={2}>
                <TablePagination
                  component="div"
                  count={count}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 25, 100]}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default Table;
