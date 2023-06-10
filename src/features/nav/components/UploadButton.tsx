import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useAppDispatch } from '../../../hooks';
import { graphAnalyzerAPI, usePostUploadMutation } from '../../api/graphAnalyzerApi';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function UploadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const [
    uploadGexf,
    {
      data: uploadGexfStatus,
      isError: uploadGexfError,
      isLoading: uploadIsLoading,
      isSuccess: uploadIsSuccess,
    },
  ] = usePostUploadMutation();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSnackbarOpen = (isSuccess: boolean) => {
    setIsSuccess(isSuccess);
    setIsOpen(true);
  };

  useEffect(() => {
    if (uploadIsSuccess && uploadGexfStatus?.status) {
      handleSnackbarOpen(true);
      dispatch(graphAnalyzerAPI.util.invalidateTags(['graph-properties', 'upload']));
    } else if (uploadGexfError) {
      handleSnackbarOpen(false);
    }
  }, [uploadGexfStatus, uploadGexfError]);

  const buttonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (null === event.target.files || event.target.files.length !== 1) {
      return;
    }
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);

    uploadGexf({
      // @ts-ignore TODO fix: https://github.com/reduxjs/redux-toolkit/issues/1827
      body: formData,
    });

    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
    }
  };

  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={uploadInputRef}
        type="file"
        accept=".gexf"
        style={{ display: 'none' }}
        onChange={buttonHandler}
      />

      {uploadIsLoading ? (
        <Button disabled variant="outlined" startIcon={<FileUploadOutlinedIcon />}>
          Processing
          <CircularProgress size={20} sx={{ marginLeft: 2 }} />
        </Button>
      ) : (
        <Button
          variant="outlined"
          startIcon={<FileUploadOutlinedIcon />}
          onClick={() => {
            uploadInputRef.current && uploadInputRef.current.click();
          }}
        >
          Upload GEXF
        </Button>
      )}
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={7000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={isSuccess ? 'success' : 'error'}>
          {isSuccess ? 'File uploaded successfully!' : `Error uploading file!`}
        </Alert>
      </Snackbar>
    </>
  );
}
