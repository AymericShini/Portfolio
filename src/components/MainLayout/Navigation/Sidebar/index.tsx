import { Box, MenuItem, Typography } from '@mui/material';
import { MenuBookIcon } from 'assets/Icons';
import Logo from 'components/Logo';
import Link from 'next/link';

// const drawerWidth = 240;

const sideBarMenu = ['Manga'];

export default function Sidebar() {
  return (
    <Box>
      <Logo sx={{ width: '20%', height: 35, padding: '25px' }} />
      {sideBarMenu.map(sidebar => (
        <MenuItem>
          <Link
            style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: 30,
              fontStyle: 'italic',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            href="/manga"
            passHref
          >
            <MenuBookIcon sx={{ marginRight: 2 }} />
            <Typography textAlign="center">{sidebar}</Typography>
          </Link>
        </MenuItem>
      ))}
    </Box>
  );
}
