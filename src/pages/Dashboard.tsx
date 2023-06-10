import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Diameter from '../features/graph-property/diameter/Diameter';
import Density from '../features/graph-property/density/Density';
import Connected from '../features/graph-property/connected/Connected';
import NetworkGraph from '../features/graph/NetworkGraph';
import DegreeDistribution from '../features/graph-property/degreeDistribution/DegreeDistribution';
import DegreeCorrelation from '../features/graph-property/degreeCorrelation/DegreeCorrelation';
import AverageClusteringCoefficient from '../features/graph-property/averageClusteringCoefficient/AverageClusteringCoefficient';
import DegreeAssortativityCoefficient from '../features/graph-property/degreeAssortativityCoefficient/DegreeAssortativityCoefficient';
import GeneralInformation from '../features/graph-property/generalInformation/GeneralInformation';
import HasCutEdge from '../features/graph-property/hasCutEdge/HasCutEdge';
import NavBar from '../features/nav/NavBar';
import HasCutVertex from '../features/graph-property/hasCutVertex/HasCutVertex';
import Robustness from '../features/graph-property/robustness/Robustness';

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        style={{
          margin: 0,
          padding: 0,
        }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 12 }}
      >
        <NavBar />
        <Grid xs={4} sm={4} md={8} lg={12} xl={12} key="graph">
          <Card elevation={3} sx={{ height: 500 }}>
            <Box style={{ height: '500px' }}>
              <NetworkGraph />
            </Box>
          </Card>
        </Grid>
        <AverageClusteringCoefficient />
        <Connected />
        <DegreeAssortativityCoefficient />
        <DegreeCorrelation />
        <DegreeDistribution />
        <Density />
        <Diameter />
        <GeneralInformation />
        <HasCutEdge />
        <HasCutVertex />
        <Robustness />
      </Grid>
    </Box>
  );
}
