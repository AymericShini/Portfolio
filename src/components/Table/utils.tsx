export const FIXED_COLUMNS = (authorizedColumns: Record<string, any>) =>
  authorizedColumns.filter((column: Record<string, any>) => column.hidable === false);

export const VARIABLE_COLUMNS = (authorizedColumns: Record<string, any>) =>
  authorizedColumns.filter((column: Record<string, any>) => column.hidable);
