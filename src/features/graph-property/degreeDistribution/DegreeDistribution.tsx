import React, { useEffect } from 'react';
import { useGetGraphPropertyDegreeDistributionQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import DistributionProperty from '../components/DistributionProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkIsOffline } from '../../nav/navBarSlice';
import {
  selectDegreeDistribution,
  updateDegreeDistributionData,
} from './degreeDistributionSlice';
import Alert from '@mui/material/Alert';

export default function DegreeDistribution() {
  const dispatch = useAppDispatch();

  const {
    data: degreeDistribution,
    isFetching,
    isSuccess,
  } = useGetGraphPropertyDegreeDistributionQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateDegreeDistributionData(degreeDistribution));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectDegreeDistribution);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Degree Distribution';
  const propertyDescription = (
    <>
      A degree is the number of directly connected other nodes (neighbours) a node has.
      The degree distribution shows a chart of the number of nodes with a certain degree.
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on an <strong>undirected</strong> and <strong>unweighted</strong>{' '}
        <strong>simple</strong> graph.
      </Alert>
    </>
  );

  const externalLinks = [
    {
      label: 'Unich',
      url: 'https://www.sci.unich.it/~francesc/teaching/network/distribution.html',
    },
    { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Degree_(graph_theory)' },
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
        <DistributionProperty
          content={data.values}
          xLabel="Degree"
          yLabel="Number of nodes"
          stepSize={1}
        />
      )}
    </BaseProperty>
  );
}
