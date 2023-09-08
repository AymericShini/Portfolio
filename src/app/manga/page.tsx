'use client';

import { doc } from '@firebase/firestore';
import { Box, Grid } from '@mui/material';
import Table from 'components/Table';
import { getMangas } from 'shared/api/manga';
import { firestore } from 'shared/constants/firebase';
import { tableConstants } from './constants';

function Manga() {
  const docRef = doc(firestore, 'mangas', 'manga');

  return (
    <Box>
      <Grid container alignItems="left" justifyContent="left" direction="column">
        <h1>Manga List</h1>
      </Grid>
      <Table docRef={docRef} tableColumns={tableConstants.tableColumns} getData={getMangas} />
    </Box>
  );
}

export default Manga;
