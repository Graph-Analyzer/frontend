import React from 'react';
import { ResponderGeneralInformationProjection } from '../../api/graphAnalyzerApi';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
interface ValueProps {
  content: ResponderGeneralInformationProjection;
}

export default function MultiValueProperty({ content }: ValueProps) {
  const formatKey = (key: string): string => {
    return `${key.charAt(0).toUpperCase()}${key.slice(1).replace('_', ' ')}`;
  };

  return (
    <List
      dense={false}
      sx={{ maxHeight: 200 }}
      style={{
        justifyContent: 'start',
        alignItems: 'start',
      }}
    >
      {Object.entries(content).map(([key, value]) => {
        return (
          <ListItem key={key}>
            <ListItemText primary={`${formatKey(key)}: ${value}`} />
          </ListItem>
        );
      })}
    </List>
  );
}
