import { Grid, Typography } from '@mui/material';
// import StatusBadge from 'components/StatusBadge';
import { FavoriteBorderIconIcon, FavoriteIconIcon } from 'assets/Icons';
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
      <Grid container wrap="nowrap" alignItems="center" textAlign="left">
        <CopyToClipboard text={value?.toString()}>
          <Grid item alignItems="center">
            {value}
          </Grid>
        </CopyToClipboard>
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
