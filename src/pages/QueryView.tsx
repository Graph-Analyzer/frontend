import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import NavBar from '../features/nav/NavBar';
import NetworkGraph from '../features/graph/NetworkGraph';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommitIcon from '@mui/icons-material/Commit';
import LinkIcon from '@mui/icons-material/Link';
import Paper from '@mui/material/Paper';
import {
  ActionQueryRequestModel,
  usePostGraphPropertyQueryMutation,
} from '../features/api/graphAnalyzerApi';
import { Radio, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export default function QueryView() {
  const [selectedValue, setSelectedValue] = React.useState<string>();

  const [updatePost, { data: postQuery }] = usePostGraphPropertyQueryMutation();

  const handleToggle = (type: ActionQueryRequestModel) => () => {
    updatePost({ actionQueryRequestModel: type });
    setSelectedValue(type.type);
  };

  const queryTypeCutEdges = 'cut_edges';
  const queryTypeCutVertices = 'cut_vertices';

  const nodesColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Node ID',
      flex: 1,
    },
    {
      field: 'label',
      headerName: 'Node Label',
      flex: 2,
      headerClassName: 'lastcolumnSeparator',
    },
  ];

  const edgesColumns: GridColDef[] = [
    {
      field: 'from',
      headerName: 'From Node ID',
      flex: 1,
    },
    {
      field: 'fromLabel',
      headerName: 'From Node Label',
      flex: 1,
    },
    {
      field: 'to',
      headerName: 'To Node ID',
      flex: 1,
    },
    {
      field: 'toLabel',
      headerName: 'To Node Label',
      flex: 1,
      headerClassName: 'lastcolumnSeparator',
    },
  ];

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
            <List>
              <ListItem>
                <ListItemIcon>
                  <CommitIcon />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-cut-vertices"
                  primary="Cut Vertices"
                />
                <Radio
                  edge="end"
                  onChange={handleToggle({ type: queryTypeCutVertices })}
                  checked={selectedValue === queryTypeCutVertices}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-cut-edges" primary="Cut Edges" />
                <Radio
                  edge="end"
                  onChange={handleToggle({ type: queryTypeCutEdges })}
                  checked={selectedValue === queryTypeCutEdges}
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={8} lg={10} xl={10} key="display">
          <Card elevation={3} sx={{ height: 400 }}>
            <Box style={{ height: '400px' }}>
              <NetworkGraph />
            </Box>
          </Card>
          <Paper sx={{ marginTop: 2 }} elevation={3}>
            <Toolbar disableGutters>
              <CommitIcon sx={{ mx: 2 }} />
              <Typography variant="h6">Nodes</Typography>
            </Toolbar>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={postQuery?.nodes ?? []}
                columns={nodesColumns}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Paper>
          <Paper sx={{ marginTop: 2 }} elevation={3}>
            <Toolbar disableGutters>
              <LinkIcon sx={{ mx: 2 }} />
              <Typography variant="h6">Edges</Typography>
            </Toolbar>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                getRowId={(row) => `${row.from}_${row.to}`}
                rows={postQuery?.edges ?? []}
                columns={edgesColumns}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
