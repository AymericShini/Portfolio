'use client';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'shared/constants/auth';

import Dna from 'components/Loader/DNALoader';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from './Navbar';

interface Props {
  children: any;
}

const Navigation = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getCurrentUser().then(user => {
      if (pathname !== '/login' && !user) {
        router.push('/login');
        window.location.reload();
      } else if (pathname === '/login') {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsLogged(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Typography
        component="h4"
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        Loading
        <Dna />
      </Typography>
    );
  }

  return (
    <>
      {isLogged && (
        <main>
          <Navbar />
          {/* <Sidebar /> */}
          {children}
        </main>
      )}
      {!isLogged && children}
    </>
  );
};

export default Navigation;
