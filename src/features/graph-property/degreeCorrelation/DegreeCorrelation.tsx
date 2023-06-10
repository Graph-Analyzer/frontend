import React, { useEffect } from 'react';
import { useGetGraphPropertyDegreeCorrelationQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import CorrelationProperty from '../components/CorrelationProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectDegreeCorrelation,
  updateDegreeCorrelationData,
} from './degreeCorrelationSlice';
import { checkIsOffline } from '../../nav/navBarSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TrendingDown, TrendingFlat, TrendingUp } from '@mui/icons-material';
import Alert from '@mui/material/Alert';

export default function DegreeCorrelation() {
  const dispatch = useAppDispatch();

  const {
    data: degreeCorrelation,
    isFetching,
    isSuccess,
  } = useGetGraphPropertyDegreeCorrelationQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateDegreeCorrelationData(degreeCorrelation));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectDegreeCorrelation);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Degree Correlation';
  const propertyDescription = (
    <>
      The average degree connectivity correlation is the average nearest neighbour degree
      of nodes with degree k.
      <List>
        <ListItem>
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <ListItemText
            primary="An increasing function indicates that the network is assortative."
            secondary="High-degree nodes tend to connect to nodes with high degrees. Low-degree nodes tend to connect to nodes with low degrees."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TrendingDown />
          </ListItemIcon>
          <ListItemText
            primary="A decreasing function indicates that the network is disassortative."
            secondary="High-degree nodes tend to connect to nodes with low degrees. Low-degree nodes tend to connect to nodes with high degrees."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TrendingFlat />
          </ListItemIcon>
          <ListItemText
            primary="A constant function indicates that the network is uncorrelated."
            secondary="There is no clear tendency on how nodes connect. They connect randomly."
          />
        </ListItem>
      </List>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Computer networks tend to be disassortative.
      </Alert>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on an <strong>undirected</strong> and <strong>unweighted</strong>{' '}
        <strong>simple</strong> graph.
      </Alert>
    </>
  );

  const externalLinks = [
    {
      label: 'NetworkX',
      url: 'https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.assortativity.average_degree_connectivity.html',
    },
    {
      label: 'Unicamp',
      url: 'https://www.ic.unicamp.br/~meidanis/courses/mo412/2020s1/slides/degree-corr/degree_correlations.pdf',
    },
  ];

  return (
    <BaseProperty
      propertyName={propertyName}
      propertyDescription={propertyDescription}
      urls={externalLinks}
      isLoading={loading}
      isLoaded={loaded}
    >
      {loaded && (
        <CorrelationProperty
          content={data.values}
          xLabel="Degree"
          yLabel="Average"
          stepSize={0.5}
        />
      )}
    </BaseProperty>
  );
}
