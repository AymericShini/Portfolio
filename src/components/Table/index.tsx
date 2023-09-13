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

import { DocumentReference, doc, getDoc } from '@firebase/firestore';
import ExportJson from 'components/Json/ExportJson';
import TableSkeleton from 'components/Skeleton/TableSkeleton';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from 'shared/constants/firebase';
import { TableColumnsConfig } from 'shared/types/table';

type Props = {
  tableColumns: TableColumnsConfig;
};

export const getClubById = async (clubDocRef: DocumentReference) => {
  const clubSnapshot = await getDoc(clubDocRef);
  return clubSnapshot.data();
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
      let uid = '';
      await onAuthStateChanged(auth, user => {
        if (user) {
          uid = user.uid;
        }
      });

      const docRef = doc(db, 'user', uid);
      const club = await getClubById(docRef);
      if (club) {
        club.mangaList.map(async (manga: Record<string, any>) => {
          const mangaSnapshot = await getDoc(manga.mangaRef);
          const mangaData = mangaSnapshot.data() as { name: string; mangaStatus: string };
          setCount(count => count + 1);
          setRows(rows => [
            ...rows,
            {
              chapter: manga.chapter,
              favorite: manga.favorite,
              readingStatus: manga.readingStatus,
              url: manga.url,
              name: mangaData.name,
              mangaStatus: mangaData.mangaStatus,
            },
          ]);
          setIsFetched(true);
        });
      }

      // const snapShot = await getDocs(q);
      // console.log(`snapShot :`, snapShot);
      // snapShot.forEach(doc => {
      //   console.log(`doc.data() :`, doc, doc.data());
      // });

      // const userRef = doc(db, 'userManga', 'tNht66GLnx83sau2Wi41');
      // const club = await getClubById(userRef);
      // const test = await getDoc(club.mangaRef);
      // const data = test.data();

      //   const querySnapshot = await getDocs(collection(db, 'manga'));
      //   querySnapshot.forEach(doc => {
      //     const data = doc.data();
      //     setRows(rows => [...rows, data]);
      //     setCount(querySnapshot.size);
      //     setIsFetched(true);
      //   });
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

  // ajoute toutes les rows du json dataAnimeCopy en tant que plusieurs documents
  // const updateDB = async () => {
  //   console.log(`dataAnimeCopy :`, dataAnimeCopy);
  //   dataAnimeCopy.forEach(async row => {
  //     const docRef = await addDoc(collection(db, 'mangaTest'), row);
  //   });
  // };

  // ajoute toutes les rows en tant qu'un SEUL document

  // const updateDB = async () => {
  //   // Add a new document in collection "mangas" in document "manga"
  //   await setDoc(doc(db, 'mangas', 'manga'), {
  //     ...rows,
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
