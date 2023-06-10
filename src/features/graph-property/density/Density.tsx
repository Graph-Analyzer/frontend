import React, { useEffect } from 'react';
import { useGetGraphPropertyDensityQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import ValueProperty from '../components/ValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkIsOffline } from '../../nav/navBarSlice';
import { selectDensity, updateDensityData } from './densitySlice';
import Alert from '@mui/material/Alert';

export default function Density() {
  const dispatch = useAppDispatch();

  const { data: density, isFetching, isSuccess } = useGetGraphPropertyDensityQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateDensityData(density));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectDensity);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Density';
  const propertyDescription = (
    <>
      Density [0, 1] is the ratio between the present edges and the maximum possible edges
      in a graph. Therefore, a complete graph (every node connects to every other node)
      has a value of 1, whereas the value for a large graph with only a few edges tends
      towards zero.
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Most large real-world networks often have a very low density.
      </Alert>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on an <strong>undirected</strong> and <strong>unweighted</strong>{' '}
        <strong>simple</strong> graph.
      </Alert>
    </>
  );

  const externalLinks = [
    {
      label: 'Baeldung',
      url: 'https://www.baeldung.com/cs/graph-density',
    },
    {
      label: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Dense_graph',
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
      {loaded && <ValueProperty content={data.value.toFixed(5)} />}
    </BaseProperty>
  );
}
