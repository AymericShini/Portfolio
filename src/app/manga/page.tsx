'use client';

import { Box, Button, Grid } from '@mui/material';
import Table from 'components/Table';
import { useState } from 'react';
import MangaAddModal from './MangaAddModal';
import { tableConstants } from './constants';

function Manga() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Grid container alignItems="left" justifyContent="left" direction="column">
        <h1>Manga List</h1>
      </Grid>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add
      </Button>
      <MangaAddModal open={open} handleClose={handleClose} />
      <Table tableColumns={tableConstants.tableColumns} />
    </Box>
  );
}

export default Manga;
