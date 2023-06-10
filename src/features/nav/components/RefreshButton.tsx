import React from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { graphAnalyzerAPI } from '../../api/graphAnalyzerApi';
import LoadingIcon from './LoadingIcon';
import { QueryStatus } from '@reduxjs/toolkit/dist/query/react';
import { graphGeneratorAPI } from '../../api/graphGeneratorApi';

export default function RefreshButton() {
  const dispatch = useAppDispatch();

  const apiIsLoading = useAppSelector((state) => {
    return Object.values(state.GraphAnalyzerApi.queries).some((query) => {
      return query && query.status === QueryStatus.pending;
    });
  });

  return (
    <Button
      variant="outlined"
      onClick={() => {
        dispatch(graphAnalyzerAPI.util.invalidateTags(['graph-properties', 'upload']));
        dispatch(graphGeneratorAPI.util.invalidateTags(['health']));
      }}
      startIcon={<LoadingIcon isLoading={apiIsLoading} />}
      disabled={apiIsLoading}
    >
      Refresh
    </Button>
  );
}
