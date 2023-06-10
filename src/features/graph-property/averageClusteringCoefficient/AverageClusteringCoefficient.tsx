import React, { useEffect } from 'react';
import { useGetGraphPropertyAverageClusteringCoefficientQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import ValueProperty from '../components/ValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectAverageClusteringCoefficient,
  updateAverageClusteringCoefficientData,
} from './averageClusteringCoefficientSlice';
import { checkIsOffline } from '../../nav/navBarSlice';
import Alert from '@mui/material/Alert';

export default function AverageClusteringCoefficient() {
  const dispatch = useAppDispatch();

  const {
    data: averageClusteringCoefficient,
    isFetching,
    isSuccess,
  } = useGetGraphPropertyAverageClusteringCoefficientQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateAverageClusteringCoefficientData(averageClusteringCoefficient));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectAverageClusteringCoefficient);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Average Clustering Coefficient';
  const propertyDescription = (
    <>
      The local clustering coefficient [0, 1] of a node represents how close its
      neighbouring nodes are to being a complete graph. It represents the average
      probability that two neighbours of a node are themselves, neighbours. The following
      illustration shows the local clustering coefficient of the blue node:
      <br />
      <br />
      <img
        height={'400px'}
        src="/local_clustering.gif"
        alt="Local clustering coefficient illustration"
      />
      <br />
      <br />
      The average clustering coefficient [0, 1] is the average of all local clustering
      coefficients in the graph.
      <Alert severity="info" sx={{ marginTop: 1 }}>
        A higher value indicates that nodes tend to cluster together.
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
      url: 'https://www.geeksforgeeks.org/clustering-coefficient-graph-theory/',
    },
    { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Clustering_coefficient' },
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
