import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  Select as MUISelect,
  MenuItem,
  OutlinedInput,
  Popover,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material';

import { SettingsIcon } from 'assets/Icons';
import MainCard from 'components/MainCard';
import { TableColumnConfigItem, TableColumnsConfig } from 'shared/types/table';
import { FIXED_COLUMNS, VARIABLE_COLUMNS } from './utils';

const DESCRIPTION_TEXT = 'Show / Hide columns';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

type Props = {
  columns: TableColumnsConfig;
  updateColumns: (columns: TableColumnsConfig) => void;
};

function TableSetting({ columns, updateColumns }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentHiddenColumns, setCurrentHiddenColumns] = useState<string[]>([]);
  let pageName = '';
  if (typeof window !== 'undefined') {
    pageName = window.location.pathname.split('/')[1].toLowerCase().replace(/\s/g, '');
  }
  const open = Boolean(anchorEl);
  const id = open ? DESCRIPTION_TEXT : undefined;

  const localStorageKey = `columns-${pageName}`;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const handleOpenMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHideColumn = (event: SelectChangeEvent<typeof currentHiddenColumns>) => {
    const {
      target: { value },
    } = event;
    const newHiddenColumns = typeof value === 'string' ? value.split(',') : value;
    setCurrentHiddenColumns(newHiddenColumns);

    const newColumns = columns.map((column: TableColumnConfigItem) => {
      column.isHidden = newHiddenColumns.includes(column.id);
      return column;
    });
    localStorage.setItem(localStorageKey, JSON.stringify(newColumns));
    updateColumns(newColumns);
  };

  const handleResetVisibility = () => {
    const newColumns = columns.map((column: TableColumnConfigItem) => {
      column.isHidden = false;
      return column;
    });
    localStorage.removeItem(localStorageKey);
    updateColumns(newColumns);
    setCurrentHiddenColumns([]);
  };

  useEffect(() => {
    const storedColumns = localStorage.getItem(localStorageKey);
    if (storedColumns) {
      const storedValue = typeof window !== 'undefined' ? JSON.parse(storedColumns) : null;
      if (storedValue !== null && typeof storedValue === 'object') {
        updateColumns(storedValue);
      }
      const parsedColumns: Record<string, any>[] = JSON.parse(storedColumns);
      const hiddenColumnsIds = parsedColumns
        .filter(column => column.isHidden)
        .map(column => column.id);
      setCurrentHiddenColumns(hiddenColumnsIds);
    }
  }, [localStorageKey, updateColumns]);

  return (
    <Box>
      <Tooltip title={DESCRIPTION_TEXT}>
        <IconButton
          onClick={handleOpenMenuClick}
          color="primary"
          aria-label={DESCRIPTION_TEXT}
          aria-describedby={id}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ maxWidth: 400 }}
      >
        <MainCard title="Select columns">
          <Typography>Fixed columns</Typography>
          <FormGroup style={{ minWidth: '400px' }}>
            <Grid container sx={{ p: 2 }} columnGap={2}>
              {FIXED_COLUMNS(columns).map((column: Record<string, any>) => (
                <Grid item>
                  <Typography key={column.id} color="secondary">
                    {column.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </FormGroup>
          <Divider sx={{ mb: 2 }} />
          <Typography>Displayed / Hidden columns</Typography>
          <Grid sx={{ py: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="table-settings-label">Columns to hide</InputLabel>
              <MUISelect
                labelId="table-settings-label"
                id="table-settings"
                multiple
                value={currentHiddenColumns}
                onChange={handleHideColumn}
                input={<OutlinedInput placeholder="Tag" />}
                renderValue={selected => selected.join(', ')}
              >
                {VARIABLE_COLUMNS(columns).map((column: Record<string, any>) => (
                  <MenuItem key={column.id} value={column.id}>
                    <Checkbox checked={column.isHidden} />
                    <ListItemText primary={column.label} />
                  </MenuItem>
                ))}
              </MUISelect>
            </FormControl>
          </Grid>
          <Button onClick={() => handleResetVisibility()} variant="outlined">
            Reset visibility
          </Button>
        </MainCard>
      </Popover>
    </Box>
  );
}

export default TableSetting;
