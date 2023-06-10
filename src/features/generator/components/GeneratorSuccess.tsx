import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useConvertConvertPostMutation } from '../../api/graphGeneratorApi';
import { selectGeneratorData } from '../generatorSlice';
import saveAs from 'file-saver';
import { useAppSelector } from '../../../hooks';
import { Box, IconButton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function GeneratorSucess() {
  const [postConvert, { data: convertedData }] = useConvertConvertPostMutation();
  const generatorResponse = useAppSelector(selectGeneratorData);

  useEffect(() => {
    if (convertedData) {
      const filename = 'export.gexf';
      const fileToSave = new Blob([convertedData], {
        type: 'application/xml',
      });
      saveAs(fileToSave, filename);
    }
  }, [convertedData]);

  const handleDownload = () => () => {
    if (generatorResponse) {
      postConvert({ fileFormat: 'gexf', graph: generatorResponse }).unwrap();
    }
  };

  return (
    <Box>
      {generatorResponse && (
        <Box height={70}>
          <Alert icon={false} severity="success">
            If you like the generated network, download it here
            <IconButton
              color="inherit"
              aria-label="Download graph"
              component="label"
              onClick={handleDownload()}
              size="small"
              sx={{ marginLeft: 1 }}
            >
              <FileDownloadOutlinedIcon />
            </IconButton>
          </Alert>
        </Box>
      )}
    </Box>
  );
}
