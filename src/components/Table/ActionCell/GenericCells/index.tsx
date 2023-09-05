import { Tooltip, Typography } from '@mui/material';
// import StatusBadge from 'components/StatusBadge';
import { TableColumnConfigItem } from 'shared/types/table';
import CopyActionCell from '../CopyActionCell';
import { FavoriteBorderIconIcon, FavoriteIconIcon } from 'assets/Icons';

type Props = {
  column: TableColumnConfigItem;
  value: any;
  row: Record<string, any>;
};

const GenericActionCell = ({ column, value, row }: Props) => {
  if (column.id === 'id' && typeof value === 'string' && value) {
    return <CopyActionCell value={value} />;
  }
  if (column.id === 'id' && typeof value === 'number' && value) {
    return value;
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
