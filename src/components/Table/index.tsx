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

import { doc, getDoc } from '@firebase/firestore';
import ExportJson from 'components/Json/ExportJson';
import ImportJson from 'components/Json/ImportJson';
import { useEffect, useState } from 'react';
import { firestore } from 'shared/api/firebase';
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
  const [_isFetched, setIsFetched] = useState(false);

  const docRef = doc(firestore, 'mangas', 'manga');

  useEffect(() => {
    setCount(rows.length);
  }, [rows]);

  useEffect(() => {
    if (rows.length > 0) {
      // Save rows to session storage
      try {
        sessionStorage.setItem('rows', JSON.stringify(rows));
      } catch (error) {
        setIsFetched(false);
      }
      // Save rows to local storage
      try {
        window.localStorage.setItem('rows', JSON.stringify(rows));
      } catch (error) {
        setIsFetched(false);
      }
    }
  }, [rows]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        const filteredData = docSnap.data();
        const finalData = filteredData && Object.keys(filteredData).map(item => filteredData[item]);
        // @ts-ignore
        setRows(finalData);
      } catch (err) {
        setIsFetched(false);
      }
    };
    // try {
    //   // Get the rows from sessionStorage or localStorage
    //   const rows = JSON.parse(window.sessionStorage.rows || window.localStorage.rows);
    //   // Set the rows in the state
    //   setRows(rows);
    // } catch (error) {
    //   console.error(error);
    // }
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
  //   // Add a new document in collection "mangas" in document "manga"
  //   await setDoc(doc(firestore, 'mangas', 'manga'), {
  //     ...rows,
  //   });
  // };

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
