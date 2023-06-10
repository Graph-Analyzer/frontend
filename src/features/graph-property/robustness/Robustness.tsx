import React, { useEffect } from 'react';
import { useGetGraphPropertyRobustnessQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import DoubleValueProperty from '../components/DoubleValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectRobustness, updateRobustnessData } from './robustnessSlice';
import { checkIsOffline } from '../../nav/navBarSlice';
import Alert from '@mui/material/Alert';

export default function Robustness() {
  const dispatch = useAppDispatch();

  const {
    data: robustness,
    isSuccess,
    isFetching,
  } = useGetGraphPropertyRobustnessQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateRobustnessData(robustness));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectRobustness);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Robustness (targeted attack)';
  const propertyDescription = (
    <>
      Targeted attacks involve intentionally selecting nodes within a network for removal,
      intending to cause maximum disruption to network functionality. These attacks
      strategically target nodes with the highest degree, which refers to nodes with the
      most connections within the network. By removing such highly connected nodes, the
      attack aims to reduce the total number of edges in the network rapidly. After each
      removal, the new highest-degree node is recalculated.
      <p>
        The first value represents the number of high-degree nodes that can be removed
        before the subsequent removal would lead to a disconnected graph.
      </p>
      <p>
        The second value is the ratio between the removed nodes and the total amount of
        nodes.
      </p>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on an <strong>undirected</strong> and <strong>unweighted</strong>{' '}
        <strong>simple</strong> graph.
      </Alert>
    </>
  );

  const externalLinks = [
    {
      label: 'TIGER',
      url: 'https://graph-tiger.readthedocs.io/en/latest/tutorials/tutorial-2.html',
    },
    {
      label: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Robustness_of_complex_networks',
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
        <DoubleValueProperty
          content1={data.nodes}
          content2={`${data.percentage.toFixed(1)} %`}
        />
      )}
    </BaseProperty>
  );
}
