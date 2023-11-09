import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from '@mui/material';
import Logo from 'components/Logo';

import Link from 'next/link';
import * as React from 'react';
import { signOutUser } from 'shared/constants/auth';

const pages = ['manga', 'about', 'Storybook'];
const settings = ['Logout'];

function Navbar() {
  const [_anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event: any) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        borderBottom: '1px solid #333333',
        right: 0,
        backgroundImage: 'none',
        height: '70px',
      }}
    >
      <Toolbar disableGutters>
        {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map(page => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link href={`/${page.toLowerCase().trim()}`} passHref>
                    {page}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Logo />

          <Box sx={{ display: { md: 'flex' } }}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link
                  style={{
                    color: 'white',
                  }}
                  href={`/${page.trim().toLowerCase()}`}
                  passHref
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { md: 'flex' } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Aymeric" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={async () => {
                      await signOutUser();
                      window.location.reload();
                    }}
                  >
                    {setting}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
