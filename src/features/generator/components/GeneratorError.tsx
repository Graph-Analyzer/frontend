import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface ErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

export default function GeneratorError({ error }: ErrorProps) {
  let errorMessage: string = 'Unknown error occurred';
  if (error) {
    if ('status' in error) {
      errorMessage =
        'error' in error ? error.error : JSON.parse(JSON.stringify(error.data)).detail;
    } else {
      errorMessage = `Serialization Error: ${error.message}`;
    }
  }

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
