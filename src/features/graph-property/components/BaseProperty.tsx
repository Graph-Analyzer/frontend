import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InformationDialog from './InformationDialog';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

interface PropertyProps {
  children: React.ReactNode;
  propertyDescription: string | React.ReactNode;
  propertyName: string;
  urls: { label: string; url: string }[];
  isLoading: boolean;
  isLoaded: boolean;
}

export default function BaseProperty({
  propertyName,
  propertyDescription,
  urls,
  children,
  isLoading,
  isLoaded,
}: PropertyProps) {
  const content = isLoading ? (
    <CircularProgress />
  ) : isLoaded ? (
    children
  ) : (
    <Alert severity="error">Error</Alert>
  );

  return (
    <Grid xs={4} sm={4} md={4} lg={4} xl={3}>
      <Card elevation={3}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {propertyName}
          </Typography>
          <Box
            minHeight={200}
            maxHeight={200}
            style={{
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {content}
          </Box>
        </CardContent>
        <CardActions>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ flex: 1 }}
          >
            <InformationDialog
              title={propertyName}
              description={propertyDescription}
              urls={urls}
            />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
