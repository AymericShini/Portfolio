import { Grid, IconButton } from '@mui/material';
import { CopyIcon } from 'assets/Icons';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = {
  value: string | number;
};

const CopyActionCell = ({ value }: Props) => (
  <Grid container wrap="nowrap" alignItems="center">
    <Grid>
      <CopyToClipboard text={value.toString()}>
        <IconButton color="primary">
          <CopyIcon />
        </IconButton>
      </CopyToClipboard>
    </Grid>
    <Grid>{typeof value === 'string' ? value.substring(0, 13) : value}</Grid>
  </Grid>
);

export default CopyActionCell;
