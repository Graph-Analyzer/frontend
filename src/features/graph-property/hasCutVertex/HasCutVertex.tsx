import React, { useEffect } from 'react';
import { useGetGraphPropertyHasCutVertexQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import ValueProperty from '../components/ValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkIsOffline } from '../../nav/navBarSlice';
import { selectHasCutVertex, updateHasCutVertexData } from './hasCutVertexSlice';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';

export default function HasCutVertex() {
  const dispatch = useAppDispatch();

  const {
    data: hasCutVertex,
    isFetching,
    isSuccess,
  } = useGetGraphPropertyHasCutVertexQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateHasCutVertexData(hasCutVertex));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectHasCutVertex);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'No Cut Vertex';
  const propertyDescription = (
    <>
      This graph property describes if there are any cut vertices (articulation points) in
      the graph. A cut vertex is a single node whose removal would split the graph.
      <List>
        <ListItem>
          <ListItemIcon>
            <ThumbUpOutlinedIcon color="success" />
          </ListItemIcon>
          <ListItemText primary="The graph has no cut vertex" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ThumbDownOutlinedIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="The graph has at least one cut vertex" />
        </ListItem>
      </List>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        It is <strong>strongly</strong> recommended not to have a single point of failure,
        such as a cut vertex, in a network.
      </Alert>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on an <strong>undirected</strong> and <strong>unweighted</strong>{' '}
        <strong>simple</strong> graph.
      </Alert>
    </>
  );

  const externalLinks = [
    {
      label: 'Geeksforgeeks',
      url: 'https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/',
    },
    { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Biconnected_component' },
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
