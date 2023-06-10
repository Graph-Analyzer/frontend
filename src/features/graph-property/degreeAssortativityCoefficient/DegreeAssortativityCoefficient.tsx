import React, { useEffect } from 'react';
import { useGetGraphPropertyDegreeAssortativityCoefficientQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import ValueProperty from '../components/ValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectDegreeAssortativityCoefficient,
  updateDegreeAssortativityCoefficientData,
} from './degreeAssortativityCoefficientSlice';
import { checkIsOffline } from '../../nav/navBarSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Add, RadioButtonUnchecked, Remove } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';

export default function DegreeAssortativityCoefficient() {
  const dispatch = useAppDispatch();

  const {
    data: degreeAssortativityCoefficient,
    isFetching,
    isSuccess,
  } = useGetGraphPropertyDegreeAssortativityCoefficientQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateDegreeAssortativityCoefficientData(degreeAssortativityCoefficient));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectDegreeAssortativityCoefficient);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Degree Assortativity Coefficient';
  const propertyDescription = (
    <>
      The degree assortativity coefficient [-1, 1] is defined by the Pearson correlation
      between the degrees of pairs of linked nodes. How nodes of one degree connect to
      nodes of another degree is known as assortativity. It represents the Degree-degree
      correlation.
      <List>
        <ListItem>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText
            primary="Positive"
            secondary="A positive value indicates that high-degree nodes tend to connect to nodes with high degrees. Low-degree nodes tend to connect to nodes with low degrees."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Remove />
          </ListItemIcon>
          <ListItemText
            primary="Negative"
            secondary="A negative value indicates that high-degree nodes tend to connect to nodes with low degrees. Low-degree nodes tend to connect to nodes with high degrees."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <RadioButtonUnchecked />
          </ListItemIcon>
          <ListItemText
            primary="Zero"
            secondary="A value near zero indicates no tendency on how nodes connect. They connect randomly."
          />
        </ListItem>
      </List>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Computer networks tend to have a negative degree assortativity coefficient.
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
      url: 'https://networkx.org/nx-guides/content/algorithms/assortativity/correlation.html#degree-assortativity-coefficient',
    },
    { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Assortativity' },
  ];

  return (
    <BaseProperty
      propertyName={propertyName}
      propertyDescription={propertyDescription}
      urls={externalLinks}
      isLoading={loading}
      isLoaded={loaded}
    >
      {loaded && <ValueProperty content={data.value.toFixed(5)} />}
    </BaseProperty>
  );
}
