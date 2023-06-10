import React from 'react';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

interface LoadingIconProps {
  isLoading: boolean;
}

export default function LoadingIcon({ isLoading }: LoadingIconProps) {
  return (
    <RefreshOutlinedIcon
      sx={
        isLoading
          ? {
              animation: 'spin 2s ease-in-out infinite',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }
          : {}
      }
    />
  );
}
