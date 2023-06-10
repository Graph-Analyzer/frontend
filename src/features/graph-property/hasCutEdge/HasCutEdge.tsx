import React, { useEffect } from 'react';
import { useGetGraphPropertyHasCutEdgeQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import ValueProperty from '../components/ValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkIsOffline } from '../../nav/navBarSlice';
import { selectHasCutEdge, updateHasCutEdgeData } from './hasCutEdgeSlice';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';

export default function HasCutEdge() {
  const dispatch = useAppDispatch();

  const {
    data: hasCutEdge,
    isFetching,
    isSuccess,
  } = useGetGraphPropertyHasCutEdgeQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateHasCutEdgeData(hasCutEdge));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectHasCutEdge);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'No Cut Edges';
  const propertyDescription = (
    <>
      This graph property describes if there are any cut edges in the graph. A cut edge is
      a single edge whose removal would split the graph.
      <List>
        <ListItem>
          <ListItemIcon>
            <ThumbUpOutlinedIcon color="success" />
          </ListItemIcon>
          <ListItemText primary="The graph has no cut edge" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ThumbDownOutlinedIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="The graph has at least one cut edge" />
        </ListItem>
      </List>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        It is <strong>strongly</strong> recommended not to have a single point of failure,
        such as a cut edge, in a network.
      </Alert>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on an <strong>undirected</strong> and <strong>unweighted</strong>{' '}
        <strong>simple</strong> graph.
      </Alert>
    </>
  );

  const externalLinks = [
    { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Bridge_(graph_theory)' },
    { label: 'Wolfram Mathworld', url: 'https://mathworld.wolfram.com/EdgeCut.html' },
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
              <ThumbDownOutlinedIcon sx={{ fontSize: 100 }} color="error" />
            ) : (
              <ThumbUpOutlinedIcon sx={{ fontSize: 100 }} color="success" />
            )
          }
        />
      )}
    </BaseProperty>
  );
}
