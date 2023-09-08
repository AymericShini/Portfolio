import { Grid, IconButton, Typography } from '@mui/material';
// import StatusBadge from 'components/StatusBadge';
import { CopyIcon, FavoriteBorderIconIcon, FavoriteIconIcon } from 'assets/Icons';
import StatusBadge from 'components/StatusBadge';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TableColumnConfigItem } from 'shared/types/table';

type Props = {
  column: TableColumnConfigItem;
  value: any;
  row: Record<string, any>;
};

const GenericActionCell = ({ column, value, row }: Props) => {
  if (column.id === 'url') {
    return (
      <Grid container wrap="nowrap" alignItems="center">
        <Grid item alignItems="center">
          <CopyToClipboard text={value?.toString()}>
            <IconButton color="primary">
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Grid>
        <Grid item alignItems="center">
          {value}
        </Grid>
      </Grid>
    );
  }
  if (column.id === 'mangaStatus') {
    return <StatusBadge status={row.mangaStatus} type="mangaStatus" />;
  }
  if (column.id === 'readingStatus') {
    return <StatusBadge status={row.readingStatus} type="readingStatus" />;
  }
  if (typeof value === 'boolean') {
    return <Typography>{value ? <FavoriteIconIcon /> : <FavoriteBorderIconIcon />}</Typography>;
  }

  return value;
};

export default GenericActionCell;
