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

import { collection, getDocs } from '@firebase/firestore';
import ExportJson from 'components/Json/ExportJson';
import TableSkeleton from 'components/Skeleton/TableSkeleton';
import { useEffect, useState } from 'react';
import { db } from 'shared/constants/firebase';
import { TableColumnsConfig } from 'shared/types/table';

type Props = {
  tableColumns: TableColumnsConfig;
};

const Table = ({ tableColumns }: Props) => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState(tableColumns);
  const [count, setCount] = useState<number>(50);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'manga'));
      querySnapshot.forEach(doc => {
        const data = doc.data();
        setRows(rows => [...rows, data]);
        setCount(querySnapshot.size);
        setIsFetched(true);
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // const updateDB = async () => {
  //   rows.forEach(async row => {
  //     const docRef = await addDoc(collection(db, 'manga'), row);
  //   });
  // };

  return (
    <Grid>
      {/* <ImportJson setJson={setRows} />
      <Button onClick={() => updateDB()}>z</Button> */}

      <Paper>
        <TableContainer sx={{ height: 'calc(100vh - 250px)' }}>
          <TableMui stickyHeader aria-label="sticky-table" sx={{ height: 'max-content' }}>
            <TableHead columns={columns} updateColumns={updateColumns} />
            <TableBody>
              {isFetched ? (
                rows &&
                (rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map(row => <TableRow columns={columns} row={row} />)
              ) : (
                <TableSkeleton columns={columns} nbRows={12} />
              )}
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
      </Paper>
    </Grid>
  );
};

export default Table;
