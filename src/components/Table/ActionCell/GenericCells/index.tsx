import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
// import StatusBadge from 'components/StatusBadge';
import { TableColumnConfigItem } from 'shared/types/table';
import CopyActionCell from '../CopyActionCell';
import { CopyIcon, FavoriteBorderIconIcon, FavoriteIconIcon } from 'assets/Icons';
import CopyToClipboard from 'react-copy-to-clipboard';

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
      </Grid>
    );
  }
  // if (column.id === 'status') {
  //   return <StatusBadge status={row.status} />;
  // }
  if (typeof value === 'boolean') {
    return (
      <Tooltip title={value ? 'true' : 'false'}>
        <Typography>{value ? <FavoriteIconIcon /> : <FavoriteBorderIconIcon />}</Typography>
      </Tooltip>
    );
  }
  return null;
};

export default GenericActionCell;
