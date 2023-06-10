import React from 'react';
import Typography from '@mui/material/Typography';

interface ValueProps {
  content: string | number | React.ReactNode;
}

export default function ValueProperty({ content }: ValueProps) {
  return (
    <Typography variant="h1" align="center" component="div">
      {content}
    </Typography>
  );
}
