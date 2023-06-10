import React from 'react';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem } from '@mui/material';

interface ValueProps {
  content1: string | number | React.ReactNode;
  content2: string | number | React.ReactNode;
}

export default function DoubleValueProperty({ content1, content2 }: ValueProps) {
  return (
    <List>
      <ListItem style={{ justifyContent: 'center' }}>
        <Typography variant="h2" align="center" component="div">
          {content1}
        </Typography>
      </ListItem>
      <Divider />
      <ListItem style={{ justifyContent: 'center' }}>
        <Typography variant="h2" align="center" component="div">
          {content2}
        </Typography>
      </ListItem>
    </List>
  );
}
