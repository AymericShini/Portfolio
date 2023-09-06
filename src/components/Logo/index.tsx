import Link from 'next/link';

// material-ui
import { ButtonBase } from '@mui/material';
import { SxProps } from '@mui/system';

// project import
import LogoAD from './LogoAD';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  sx?: SxProps;
}

const Logo = ({ sx }: Props) => (
  <Link href="/home" passHref>
    <ButtonBase disableRipple sx={sx}>
      <LogoAD fill="white" />
    </ButtonBase>
  </Link>
);

export default Logo;
