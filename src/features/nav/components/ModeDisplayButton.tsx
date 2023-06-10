import React from 'react';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../../hooks';
import CircleIcon from '@mui/icons-material/Circle';
import { checkIsOffline } from '../navBarSlice';
import { styled } from '@mui/material/styles';

interface DisabledColorButtonProps {
  offline: number;
}

const DisabledColorButton = styled(Button)<DisabledColorButtonProps>(
  ({ theme, offline }) => ({
    '&:disabled': {
      color: offline ? theme.palette.warning.main : theme.palette.success.main,
      border: '1px solid',
    },
  })
);

export default function ModeDisplayButton() {
  const isOffline = useAppSelector(checkIsOffline);

  return (
    <DisabledColorButton
      variant="outlined"
      disableRipple
      disabled
      offline={isOffline ? 1 : 0}
      endIcon={<CircleIcon />}
    >
      Mode: {isOffline ? 'Offline' : 'Online'}
    </DisabledColorButton>
  );
}
