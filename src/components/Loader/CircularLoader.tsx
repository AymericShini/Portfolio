import { Box, CircularProgress } from '@mui/material';

type Props = {
  className?: string;
};

const Loader = ({ className }: Props) => (
  <Box>
    <CircularProgress sx={{ margin: 'auto' }} />
  </Box>
);

export default Loader;
