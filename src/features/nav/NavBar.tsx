import React from 'react';
import { useAppSelector } from '../../hooks';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { checkIsOffline } from './navBarSlice';
import ExportButton from './components/ExportButton';
import { PageRoute } from '../../App';
import ImportButton from './components/ImportButton';
import RefreshButton from './components/RefreshButton';
import ModeDisplayButton from './components/ModeDisplayButton';
import GoOnlineButton from './components/GoOnlineButton';
import { useHealthHealthGetQuery } from '../api/graphGeneratorApi';
import { useGetUploadStatusQuery } from '../api/graphAnalyzerApi';
import UploadButton from './components/UploadButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export default function NavBar() {
  const location = useLocation();
  const isOnDashboard = location.pathname === PageRoute.Dashboard;

  const isOffline = useAppSelector(checkIsOffline);

  const { data: generatorHealth, isSuccess: generatorHealthIsSuccess } =
    useHealthHealthGetQuery();
  const { data: gexfUploadHealth, isSuccess: gexfUploadHealthIsSuccess } =
    useGetUploadStatusQuery();

  return (
    <Grid
      xs={12}
      container
      style={{
        margin: 0,
        paddingLeft: 12,
        paddingRight: 12,
      }}
      justifyContent="space-between"
      flexDirection={{ xs: 'column', sm: 'row' }}
      sx={{ fontSize: '12px' }}
    >
      <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
        <Grid my={1}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Button variant={isActive ? 'contained' : 'outlined'}>Dashboard</Button>
            )}
          </NavLink>
        </Grid>
        {!isOffline && (
          <Grid my={1}>
            <NavLink to="/query" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Button variant={isActive ? 'contained' : 'outlined'}>Query View</Button>
              )}
            </NavLink>
          </Grid>
        )}
        {!isOffline && generatorHealthIsSuccess && generatorHealth.status && (
          <Grid my={1}>
            <NavLink to="/generator" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Button variant={isActive ? 'contained' : 'outlined'}>Generator</Button>
              )}
            </NavLink>
          </Grid>
        )}
      </Grid>
      <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
        {!isOffline && isOnDashboard && (
          <Grid my={1}>
            <RefreshButton />
          </Grid>
        )}
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Grid my={1}>
            {!isOffline && isOnDashboard && <ExportButton />}
            {isOffline && isOnDashboard && <GoOnlineButton />}
            {isOnDashboard && <ImportButton />}
          </Grid>
        </ButtonGroup>
        {!isOffline && isOnDashboard && (
          <Grid my={1}>
            {gexfUploadHealthIsSuccess && gexfUploadHealth.healthy ? (
              <UploadButton />
            ) : (
              <Button variant="outlined" disabled startIcon={<FileUploadOutlinedIcon />}>
                Upload GEXF
              </Button>
            )}
          </Grid>
        )}
        <Grid my={1}>
          <ModeDisplayButton />
        </Grid>
      </Grid>
    </Grid>
  );
}
