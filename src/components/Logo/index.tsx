import Link from 'next/link';

// material-ui
import { SxProps } from '@mui/system';

// project import
import LogoAD from './LogoAD';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  sx?: SxProps;
}

const Logo = ({ sx }: Props) => (
  <Link style={{ display: 'flex', alignItems: 'center' }} href="/home" passHref>
    <LogoAD fill="red" width={40} height={40} />
  </Link>
);

export default Logo;
