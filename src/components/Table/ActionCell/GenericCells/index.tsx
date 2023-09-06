import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
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
        <Grid>
          <CopyToClipboard text={value.toString()}>
            <IconButton color="primary">
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Grid>
        <Grid>{value}</Grid>
      </Grid>
    );
  }
  if (column.id === 'readingStatus') {
    return <StatusBadge status={row.readingStatus} />;
  }
  if (typeof value === 'boolean') {
    return (
      <Tooltip title={value ? 'true' : 'false'}>
        <Typography>{value ? <FavoriteIconIcon /> : <FavoriteBorderIconIcon />}</Typography>
      </Tooltip>
    );
  }

  return value;
};

export default GenericActionCell;
