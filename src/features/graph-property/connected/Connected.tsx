import React, { useEffect } from 'react';
import { useGetGraphPropertyConnectedQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import ValueProperty from '../components/ValueProperty';
import { selectConnected, updateConnectedData } from './connectedSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkIsOffline } from '../../nav/navBarSlice';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';

export default function Connected() {
  const dispatch = useAppDispatch();

  const { data: connected, isFetching, isSuccess } = useGetGraphPropertyConnectedQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateConnectedData(connected));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectConnected);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Connected';
  const propertyDescription = (
    <>
      A connected graph describes that there is <strong>a path</strong> with which a node
      can reach <strong>every</strong> other node of the graph. If this is not the case,
      the graph is disconnected.
      <List>
        <ListItem>
          <ListItemIcon>
            <ThumbUpOutlinedIcon color="success" />
          </ListItemIcon>
          <ListItemText primary="Graph is connected" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ThumbDownOutlinedIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Graph is disconnected" />
        </ListItem>
      </List>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on an <strong>undirected</strong> and <strong>unweighted</strong>{' '}
        <strong>simple</strong> graph.
      </Alert>
    </>
  );

  const externalLinks = [
    {
      label: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Connectivity_(graph_theory)',
    },
    {
      label: 'Wolfram Mathworld',
      url: 'https://mathworld.wolfram.com/ConnectedGraph.html',
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
        <ValueProperty
          content={
            data.status ? (
              <ThumbUpOutlinedIcon sx={{ fontSize: 100 }} color="success" />
            ) : (
              <ThumbDownOutlinedIcon sx={{ fontSize: 100 }} color="error" />
            )
          }
        />
      )}
    </BaseProperty>
  );
}
