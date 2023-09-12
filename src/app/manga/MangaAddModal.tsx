import { Autocomplete, Box, Button, TextField } from '@mui/material';
import Modal from 'components/Modal';
import { Timestamp, addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from 'shared/constants/firebase';
import { Manga } from 'shared/types/manga';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const MangaAddModal = ({ open, handleClose }: Props) => {
  const [data, setData] = useState<Manga>({
    name: '',
    url: '',
    chapter: '',
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
    favorite: false,
    mangaStatus: 'active',
    readingStatus: 'paused',
  });
  const [mangaList, setMangaList] = useState([]);

  const handleAdd = () => {
    addDoc(collection(db, 'manga'), data);
  };

  useEffect(() => {
    const fetchDataManga = async () => {
      const test = query(collection(db, 'mangaTest'), orderBy('title'), limit(25));
      const docSnap = await getDocs(test);

      docSnap.forEach(doc => {
        setMangaList(mangaList => [...mangaList, doc.data()]);
        // setMangaList(doc.data());
      });
    };

    fetchDataManga();
  }, []);

  return (
    <Modal open={open} handleClose={handleClose} title="Add a manga" closeIcon>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Autocomplete
          sx={{ width: '1500px' }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onChange={(event, value) =>
            setData((prevState: any) => ({
              ...prevState,
              name: value.trim(),
            }))
          } // prints the selected value
          options={mangaList.map(option => option.title)}
          renderInput={params => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <TextField
          autoComplete="off"
          name="name"
          placeholder="Name"
          variant="outlined"
          value={data.name}
          onChange={event =>
            setData((prevState: any) => ({
              ...prevState,
              name: event.target.value.trim(),
            }))
          }
          fullWidth
          sx={{ maxWidth: '250px' }}
        />
        <TextField
          autoComplete="off"
          name="url"
          placeholder="Url"
          variant="outlined"
          value={data.url}
          onChange={event =>
            setData((prevState: any) => ({
              ...prevState,
              url: event.target.value.trim(),
            }))
          }
          fullWidth
          sx={{ maxWidth: '250px' }}
        />
        <TextField
          onChange={event =>
            setData((prevState: any) => ({
              ...prevState,
              chapter: event.target.value,
            }))
          }
          placeholder="Chapter"
          value={data.chapter}
          inputMode="numeric"
          type="number"
          id="salesRule"
          fullWidth
          required
        />
      </Box>
      <Button variant="outlined" onClick={() => handleAdd()}>
        Add
      </Button>
    </Modal>
  );
};

export default MangaAddModal;
