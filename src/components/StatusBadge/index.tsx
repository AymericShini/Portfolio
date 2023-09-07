import { Chip, ChipProps, Tooltip } from '@mui/material';

import { Status } from 'shared/types/status';

export const mapColorFromStatus: Record<Status, ChipProps['color']> = {
  active: 'success',
  paused: 'info',
  finished: 'error',
  abandonned: 'secondary',
};

const mapLabelMangaStatus: Record<Status, string> = {
  active: 'active',
  paused: 'paused',
  finished: 'finished',
  abandonned: 'abandonned',
};

const mapLabelReadingStatus: Record<Status, string> = {
  active: 'reading',
  paused: 'paused',
  finished: 'stopped',
};

type Type = 'mangaStatus' | 'readingStatus';

type Props = {
  status: Status;
  type: Type;
};

const StatusBadge = ({ status, type }: Props) => {
  const label =
    type === 'mangaStatus' ? mapLabelMangaStatus[status] : mapLabelReadingStatus[status];
  if (!label) return null;
  return (
    <Tooltip title={label}>
      <Chip
        sx={type === 'readingStatus' ? { width: '14px', height: '14px' } : {}}
        label={type === 'mangaStatus' ? label : ''}
        color={mapColorFromStatus[status]}
      />
    </Tooltip>
  );
};

export default StatusBadge;
