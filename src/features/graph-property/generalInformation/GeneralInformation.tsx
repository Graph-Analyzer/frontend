import React, { useEffect } from 'react';
import { useGetGraphPropertyGeneralInformationQuery } from '../../api/graphAnalyzerApi';
import BaseProperty from '../components/BaseProperty';
import MultiValueProperty from '../components/MultiValueProperty';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkIsOffline } from '../../nav/navBarSlice';
import {
  selectGeneralInformation,
  updateGeneralInformationData,
} from './generalInformationSlice';

export default function GeneralInformation() {
  const dispatch = useAppDispatch();

  const {
    data: generalInformation,
    isFetching,
    isSuccess,
  } = useGetGraphPropertyGeneralInformationQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateGeneralInformationData(generalInformation));
    }
  }, [isFetching, isSuccess]);

  const data = useAppSelector(selectGeneralInformation);
  const isOffline = useAppSelector(checkIsOffline);

  const loading = !isOffline && isFetching;
  const loaded = undefined !== data && (isOffline || isSuccess);

  const propertyName = 'General Information';
  // Empty -> "Learn more" button is disabled
  const propertyDescription = '';

  return (
    <BaseProperty
      propertyName={propertyName}
      propertyDescription={propertyDescription}
      urls={[]}
      isLoading={loading}
      isLoaded={loaded}
    >
      {loaded && <MultiValueProperty content={data} />}
    </BaseProperty>
  );
}
