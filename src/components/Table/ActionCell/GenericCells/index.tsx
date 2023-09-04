import { Box, Divider, Tooltip, Typography } from '@mui/material';
// import StatusBadge from 'components/StatusBadge';
import { TableColumnConfigItem } from 'shared/types/table';
import CopyActionCell from '../CopyActionCell';

type Props = {
  column: TableColumnConfigItem;
  value: any;
  row: Record<string, any>;
};

const GenericActionCell = ({ column, value, row }: Props) => {
  if (Array.isArray(value)) {
    return (
      <Box>
        {value?.map((key: string, index: number) => (
          <Box key={index}>
            {column.id === 'billingPageId' ? key?.substring(0, 13) : key}
            {index !== value.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    );
  }
  if (!['status', 'biOfferId', 'id'].includes(column.id) && typeof value !== 'object' && value) {
    return value;
  }
  if (column.id === 'id' && typeof value === 'string' && value) {
    return <CopyActionCell value={value} />;
  }
  if (column.id === 'id' && typeof value === 'number' && value) {
    return value;
  }
  // if (column.id === 'status') {
  //   return <StatusBadge status={row.status} />;
  // }
  if (column.id === 'currency' && row.currency) {
    return (
      <Tooltip title={row.currency.name}>
        <Typography>{row.currency.code}</Typography>
      </Tooltip>
    );
  }
  return null;
};

export default GenericActionCell;
