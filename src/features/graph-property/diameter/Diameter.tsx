import React, { useEffect } from 'react';
import { useGetGraphPropertyDiameterQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import DoubleValueProperty from '../components/DoubleValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectDiameter, updateDiameterData } from './diameterSlice';
import { checkIsOffline } from '../../nav/navBarSlice';
import Alert from '@mui/material/Alert';

export default function Diameter() {
  const dispatch = useAppDispatch();

  const { data: diameter, isSuccess, isFetching } = useGetGraphPropertyDiameterQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateDiameterData(diameter));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectDiameter);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'Diameter';
  const propertyDescription = (
    <>
      The diameter is the longest shortest path in a network. All shortest paths between
      all pairs of nodes need to be calculated. The longest of them will be the so-called
      diameter.
      <p>
        The first value is the sum of all edge weights. For example, IGP link weights.
      </p>
      <p>The second value is the number of edges.</p>
      <Alert severity="info" sx={{ marginTop: 1 }}>
        Based on <strong>directed</strong> and <strong>weighted</strong>{' '}
        <strong>multigraph</strong>.
      </Alert>
    </>
  );

  const externalLinks = [
    {
      label: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Network_science#Diameter_of_a_network',
    },
    {
      label: 'Wolfram Mathworld',
      url: 'https://mathworld.wolfram.com/GraphDiameter.html',
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
      {loaded && <DoubleValueProperty content1={data.diameter} content2={data.hops} />}
    </BaseProperty>
  );
}
