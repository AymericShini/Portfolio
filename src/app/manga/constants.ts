import { TableConfig } from 'shared/types/table';

export const tableConstants: TableConfig = {
  tableColumns: [
    {
      id: 'readingStatus',
      label: 'Reading Status',
      sortable: true,
      hidable: false,
    },
    {
      id: 'name',
      label: 'Name',
      sortable: true,
      hidable: false,
    },
    {
      id: 'url',
      label: 'Url',
      hidable: true,
      isHidden: false,
    },
    {
      id: 'chapter',
      label: 'Chapter',
      hidable: true,
      isHidden: false,
    },
    {
      id: 'favorite',
      label: 'Favorite',
      hidable: true,
      isHidden: false,
    },
    {
      id: 'mangaStatus',
      label: 'Manga Status',
      hidable: true,
      isHidden: false,
    },
  ],
  filters: {
    name: {
      input: 'textField',
      label: 'Manga',
    },
    url: {
      input: 'textField',
      label: 'Url',
    },
  },
};
