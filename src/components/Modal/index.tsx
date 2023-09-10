import { Box, Button, CardContent, IconButton, Modal, Stack } from '@mui/material';
import { CloseIcon } from 'assets/Icons';
import MainCard from 'components/MainCard';
import React from 'react';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  closeIcon?: boolean;
  closeButton?: boolean;
};

const CustomModal = ({ open, handleClose, title, children, closeButton, closeIcon }: Props) => (
  <Modal open={open} onClose={handleClose}>
    <MainCard
      title={title}
      modal
      darkTitle
      content={false}
      secondary={
        closeIcon ? (
          <IconButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ) : null
      }
    >
      <CardContent>
        <Box>{children}</Box>
      </CardContent>
      {closeButton ? (
        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ px: 2.5, py: 2 }}>
          <Button color="error" size="small" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      ) : null}
    </MainCard>
  </Modal>
);

export default CustomModal;
