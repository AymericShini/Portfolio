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

import { DocumentData, DocumentReference } from '@firebase/firestore';
import ExportJson from 'components/Json/ExportJson';
import TableSkeleton from 'components/Skeleton/TableSkeleton';
import { useEffect, useState } from 'react';
import { TableColumnsConfig } from 'shared/types/table';

type Props = {
  tableColumns: TableColumnsConfig;
  docRef: DocumentReference<DocumentData, DocumentData>;
  getData: (docRef: DocumentReference<DocumentData, DocumentData>) => Promise<Record<string, any>>;
};

const Table = ({ tableColumns, docRef, getData }: Props) => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState(tableColumns);
  const [count, setCount] = useState<number>(50);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getData(docRef).then(response => {
          const filteredData = response.data();
          const finalData = filteredData
            ? Object.keys(filteredData).map(item => filteredData[item])
            : [];
          setIsFetched(true);
          setRows(finalData);
          setCount(finalData.length);
        });
      } catch (err) {
        setIsFetched(false);
      }
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
  //   // Add a new document in collection "mangas" in document "manga"
  //   await setDoc(doc(firestore, 'mangas', 'manga'), {
  //     ...rows,
  //   });
  // };

  return (
    <Grid>
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
                <TableSkeleton columns={columns} nbRows={10} />
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
