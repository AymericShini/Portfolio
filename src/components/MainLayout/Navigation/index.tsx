'use client';
import { Box, Container } from '@mui/material';
import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const Navigation = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Container
          maxWidth="xl"
          sx={{
            marginTop: '70px',
            position: 'relative',
            minHeight: 'calc(100vh - 50px)',
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
};

export default Navigation;
