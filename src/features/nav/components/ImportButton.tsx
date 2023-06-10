import React, { useRef } from 'react';
import { Buffer } from 'buffer';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useAppDispatch } from '../../../hooks';
import { changeModeToOffline } from '../navBarSlice';
import { ExportData } from './ExportButton';
import { updateAverageClusteringCoefficientData } from '../../graph-property/averageClusteringCoefficient/averageClusteringCoefficientSlice';
import { updateDiameterData } from '../../graph-property/diameter/diameterSlice';
import { updateNetworkGraphData } from '../../graph/networkGraphSlice';
import { updateConnectedData } from '../../graph-property/connected/connectedSlice';
import { updateDegreeAssortativityCoefficientData } from '../../graph-property/degreeAssortativityCoefficient/degreeAssortativityCoefficientSlice';
import { updateDegreeCorrelationData } from '../../graph-property/degreeCorrelation/degreeCorrelationSlice';
import { updateDegreeDistributionData } from '../../graph-property/degreeDistribution/degreeDistributionSlice';
import { updateDensityData } from '../../graph-property/density/densitySlice';
import { updateGeneralInformationData } from '../../graph-property/generalInformation/generalInformationSlice';
import { updateHasCutEdgeData } from '../../graph-property/hasCutEdge/hasCutEdgeSlice';
import { updateHasCutVertexData } from '../../graph-property/hasCutVertex/hasCutVertexSlice';
import { updateRobustnessData } from '../../graph-property/robustness/robustnessSlice';

export default function ImportButton() {
  const dispatch = useAppDispatch();

  const setData = (data: JSON) => {
    const importData = Object.assign(new ExportData(), data);

    dispatch(
      updateAverageClusteringCoefficientData(importData.averageClusteringCoefficient)
    );
    dispatch(updateConnectedData(importData.connected));
    dispatch(
      updateDegreeAssortativityCoefficientData(importData.degreeAssortativityCoefficient)
    );
    dispatch(updateDegreeCorrelationData(importData.degreeCorrelation));
    dispatch(updateDegreeDistributionData(importData.degreeDistribution));
    dispatch(updateDensityData(importData.density));
    dispatch(updateDiameterData(importData.diameter));
    dispatch(updateGeneralInformationData(importData.generalInformation));
    dispatch(updateHasCutEdgeData(importData.hasCutEdge));
    dispatch(updateHasCutVertexData(importData.hasCutVertex));
    dispatch(updateRobustnessData(importData.robustness));
    dispatch(updateNetworkGraphData(importData.fullGraph));
  };

  const buttonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    event.target.accept.includes('json');

    if (null === event.target.files || event.target.files.length !== 1) {
      return;
    }

    // Reset graph to trigger new layout calculation
    dispatch(updateNetworkGraphData(undefined));

    fileReader.readAsArrayBuffer(event.target.files[0]);

    fileReader.onloadend = (e) => {
      if (!(e.target?.result instanceof ArrayBuffer)) {
        return;
      }

      const data = JSON.parse(Buffer.from(e.target.result).toString());

      setData(data);

      if (uploadInputRef.current) {
        uploadInputRef.current.value = '';
      }
    };

    dispatch(changeModeToOffline());
  };

  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        ref={uploadInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={buttonHandler}
      />
      <Button
        variant="outlined"
        startIcon={<FileUploadOutlinedIcon />}
        onClick={() => {
          uploadInputRef.current && uploadInputRef.current.click();
        }}
      >
        Import
      </Button>
    </>
  );
}
