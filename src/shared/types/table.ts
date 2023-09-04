export type TableColumnsConfig = Array<TableColumnConfigItem>;

export type TableFiltersConfig = {
    [key: string]: TableColumnConfig;
  };

  export type TableColumnConfig = {
    input: 'select' | 'textField' | 'status';
    label: string;
    isUnique?: boolean;
  };

export type TableConfig = {
    tableColumns: TableColumnsConfig;
    filters?: TableFiltersConfig;
  };

  export type TableColumnConfigItem = {
    id: string;
    label?: string;
    sortable?: boolean;
    hidable?: boolean;
    showTotal?: boolean;
    isHidden?: boolean;
    totalKey?: string;
  };
  
  export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
  };