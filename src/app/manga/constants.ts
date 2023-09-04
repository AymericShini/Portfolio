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
