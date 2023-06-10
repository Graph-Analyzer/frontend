import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import NavBar from '../features/nav/NavBar';
import PreviewGraph from '../features/graph/PreviewGraph';
import GeneratorForm from '../features/generator/components/GeneratorForm';
import GeneratorSucess from '../features/generator/components/GeneratorSuccess';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../hooks';
import { selectGeneratorData } from '../features/generator/generatorSlice';

export default function Generator() {
  const generatorResponse = useAppSelector(selectGeneratorData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        style={{
          margin: 0,
          padding: 0,
        }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 12, lg: 12, xl: 12 }}
      >
        <NavBar />
        <Grid xs={12} sm={12} md={4} lg={2} xl={2} key="sort" style={{ height: '100%' }}>
          <Card elevation={3}>
            <GeneratorForm />
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={8} lg={10} xl={10} key="display">
          <GeneratorSucess />
          <Card elevation={3} sx={{ height: 600 }}>
            <Box
              style={{
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {generatorResponse ? (
                <PreviewGraph data={generatorResponse} />
              ) : (
                <Typography variant="overline" sx={{ textAlign: 'center' }}>
                  Preview of the generated graph
                </Typography>
              )}
            </Box>
          </Card>
          <Card elevation={3} sx={{ mt: 1 }}>
            <Box sx={{ width: '100%' }}>
              <List component={Stack} direction={{ xs: 'column', lg: 'row' }}>
                <ListItem>
                  <ListItemIcon>
                    <CircleIcon sx={{ color: '#e91e63' }} />
                  </ListItemIcon>
                  <ListItemText primary="Core node" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CircleIcon sx={{ color: '#ff9800' }} />
                  </ListItemIcon>
                  <ListItemText primary="Random core node" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CircleIcon sx={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText primary="Level 1 PoP" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CircleIcon sx={{ color: '#2196f3' }} />
                  </ListItemIcon>
                  <ListItemText primary="Level 2 PoP" />
                </ListItem>
              </List>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
