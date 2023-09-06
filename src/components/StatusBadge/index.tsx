import { Chip, ChipProps } from '@mui/material';

import { Status } from 'shared/types/status';

export const mapColorFromStatus: Record<Status, ChipProps['color']> = {
  active: 'success',
  paused: 'info',
  finished: 'error',
  abandonned: 'secondary',
};

const mapLabelFromStatus: Record<Status, string> = {
  active: 'active',
  paused: 'paused',
  finished: 'finished',
  abandonned: 'abandonned',
};

type Props = {
  status: Status;
};

const StatusBadge = ({ status }: Props) => {
  const label = mapLabelFromStatus[status];
  if (!label) return null;
  return <Chip label={label} color={mapColorFromStatus[status]} />;
};

export default StatusBadge;
