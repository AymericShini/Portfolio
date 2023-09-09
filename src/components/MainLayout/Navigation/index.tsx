'use client';

import { Box, Container } from '@mui/material';
import Navbar from './Navbar';

interface Props {
  children: any;
}

const Navigation = ({ children }: Props) => (
  <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
    <Navbar />
    {/* <Sidebar /> */}
    <Box component="main">
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <Breadcrumbs card={false} divider={false} /> */}
        {children}
      </Container>
    </Box>
  </Box>
);

export default Navigation;
