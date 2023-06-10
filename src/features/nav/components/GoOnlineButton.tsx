import React from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../hooks';
import { resetState } from '../../../store';
import { PowerOutlined } from '@mui/icons-material';
import { graphGeneratorAPI } from '../../api/graphGeneratorApi';
import { graphAnalyzerAPI } from '../../api/graphAnalyzerApi';

export default function GoOnlineButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        dispatch(resetState);
        dispatch(graphGeneratorAPI.util.resetApiState());
        dispatch(graphAnalyzerAPI.util.resetApiState());
      }}
      startIcon={<PowerOutlined />}
    >
      Go Online
    </Button>
  );
}
