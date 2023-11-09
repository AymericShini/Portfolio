import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import Modal from 'components/Modal';
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from 'shared/constants/firebase';
import { Manga } from 'shared/types/manga';

type Props = {
  open: boolean;
  handleClose: () => void;
};

type MangaList = {
  title: string;
  // add any other properties here
};

const MangaAddModal = ({ open, handleClose }: Props) => {
  const [data, setData] = useState<Manga>({
    // @ts-ignore
    title: '',
    mangaRef: '',
    url: '',
    chapter: '',
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
    favorite: false,
    mangaStatus: 'active',
    readingStatus: 'active',
  });
  const [mangaList, setMangaList] = useState<MangaList[]>([]);
  // trigger next API call not before 500ms
  // const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    const fetchDataManga = async () => {
      const test = query(collection(db, 'mangaLib'), orderBy('title'), limit(25));
      const docSnap = await getDocs(test);

      docSnap.forEach(doc => {
        setMangaList((mangaList: MangaList[]) => [...mangaList, doc.data() as MangaList]);
      });
    };

    fetchDataManga();
  }, []);

  const handleAdd = () => {
    // console.log(`data :`, data);
    // addDoc(collection(db, 'manga'), data);
  };

  const getData = async (value: string) => {
    // const dbCount = query(collection(db, 'mangaLib'));
    // const snapshotDbCount = await getCountFromServer(dbCount);
    // console.log('snapshot.data().count :', snapshotDbCount.data().count);
    const test = query(
      collection(db, 'mangaLib'),
      orderBy('title'),
      limit(25),
      where('title', '>=', value),
      where('title', '<=', `${value}\uf8ff`),
    );
    const docSnap = await getDocs(test);
    let mangaSearchedList: MangaList[] = [];
    docSnap.forEach(doc => {
      // @ts-ignore
      mangaSearchedList = docSnap.docs.map(doc => {
        const finalDoc = { docId: doc.id, ...doc.data() };
        return finalDoc;
      });
      setMangaList(mangaSearchedList);
    });
  };

  const onInputChange = (event: any, value: string, reason: any) => {
    if (value) {
      getData(value);
    } else {
      setMangaList([]);
    }
  };

  return (
    <Modal open={open} handleClose={handleClose} title="Add a manga" closeIcon>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '80vw',
          justifyContent: 'space-between',
        }}
      >
        <Autocomplete
          autoHighlight
          noOptionsText="No manga found"
          onInputChange={onInputChange}
          sx={{
            width: '35%',
          }}
          onChange={(event, value) =>
            setData((prevState: any) => ({
              ...prevState,
              // @ts-ignore
              mangaRef: doc(db, 'mangaTest', value?.docId),
            }))
          }
          options={mangaList}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              {option.title}
            </Box>
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Search a manga (case sensitive)"
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
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
          sx={{ maxWidth: '35%' }}
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
          sx={{ maxWidth: '10%' }}
        />
      </Box>
      <Stack direction="row" justifyContent="flex-end" marginTop="25px">
        <Button variant="outlined" onClick={() => handleAdd()}>
          Add
        </Button>
      </Stack>
    </Modal>
  );
};

export default MangaAddModal;
