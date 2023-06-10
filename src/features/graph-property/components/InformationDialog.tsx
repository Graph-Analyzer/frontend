import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

interface DialogProps {
  title: string;
  description: string | React.ReactNode;
  urls: { label: string; url: string }[];
}

export default function InformationDialog({ title, description, urls }: DialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        onClick={handleClickOpen}
        disabled={description ? false : true}
      >
        Learn More
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box
            m={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{ flex: 1 }}
          >
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
          {urls.map((link, index) => {
            return (
              <Button key={index} href={link.url} target="_blank">
                {link.label}
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </div>
  );
}
