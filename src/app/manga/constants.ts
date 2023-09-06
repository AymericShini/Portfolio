import { TableConfig } from 'shared/types/table';

export const tableConstants: TableConfig = {
  tableColumns: [
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
      id: 'chapitre',
      label: 'Chapitre',
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
      id: 'readingStatus',
      label: 'Reading Status',
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
