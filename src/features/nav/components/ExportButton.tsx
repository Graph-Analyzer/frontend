import React from 'react';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { saveAs } from 'file-saver';
import {
  ResponderAverageClusteringCoefficientProjection,
  ResponderConnectedProjection,
  ResponderDegreeAssortativityCoefficientProjection,
  ResponderDegreeCorrelationProjection,
  ResponderDegreeDistributionProjection,
  ResponderDensityProjection,
  ResponderDiameterProjection,
  ResponderFullGraphProjection,
  ResponderGeneralInformationProjection,
  ResponderHasCutEdgeProjection,
  ResponderHasCutVertexProjection,
  ResponderRobustnessProjection,
  useGetGraphPropertyAverageClusteringCoefficientQuery,
  useGetGraphPropertyConnectedQuery,
  useGetGraphPropertyDegreeAssortativityCoefficientQuery,
  useGetGraphPropertyDegreeCorrelationQuery,
  useGetGraphPropertyDegreeDistributionQuery,
  useGetGraphPropertyDensityQuery,
  useGetGraphPropertyDiameterQuery,
  useGetGraphPropertyFullGraphQuery,
  useGetGraphPropertyGeneralInformationQuery,
  useGetGraphPropertyHasCutEdgeQuery,
  useGetGraphPropertyHasCutVertexQuery,
  useGetGraphPropertyRobustnessQuery,
} from '../../api/graphAnalyzerApi';
import { useAppSelector } from '../../../hooks';
import { QueryStatus } from '@reduxjs/toolkit/dist/query/react';

export class ExportData {
  averageClusteringCoefficient:
    | ResponderAverageClusteringCoefficientProjection
    | undefined;
  connected: ResponderConnectedProjection | undefined;
  degreeAssortativityCoefficient:
    | ResponderDegreeAssortativityCoefficientProjection
    | undefined;
  degreeCorrelation: ResponderDegreeCorrelationProjection | undefined;
  degreeDistribution: ResponderDegreeDistributionProjection | undefined;
  density: ResponderDensityProjection | undefined;
  diameter: ResponderDiameterProjection | undefined;
  fullGraph: ResponderFullGraphProjection | undefined;
  generalInformation: ResponderGeneralInformationProjection | undefined;
  hasCutEdge: ResponderHasCutEdgeProjection | undefined;
  hasCutVertex: ResponderHasCutVertexProjection | undefined;
  robustness: ResponderRobustnessProjection | undefined;
}

export default function ExportButton() {
  const { data: averageClusteringCoefficient } =
    useGetGraphPropertyAverageClusteringCoefficientQuery();
  const { data: connected } = useGetGraphPropertyConnectedQuery();
  const { data: degreeAssortativityCoefficient } =
    useGetGraphPropertyDegreeAssortativityCoefficientQuery();
  const { data: degreeCorrelation } = useGetGraphPropertyDegreeCorrelationQuery();
  const { data: degreeDistribution } = useGetGraphPropertyDegreeDistributionQuery();
  const { data: density } = useGetGraphPropertyDensityQuery();
  const { data: diameter } = useGetGraphPropertyDiameterQuery();
  const { data: fullGraph } = useGetGraphPropertyFullGraphQuery();
  const { data: generalInformation } = useGetGraphPropertyGeneralInformationQuery();
  const { data: hasCutEdge } = useGetGraphPropertyHasCutEdgeQuery();
  const { data: hasCutVertex } = useGetGraphPropertyHasCutVertexQuery();
  const { data: robustness } = useGetGraphPropertyRobustnessQuery();

  const isLoading = useAppSelector((state) => {
    return Object.values(state.GraphAnalyzerApi.queries).some((query) => {
      return (
        query &&
        (query.status === QueryStatus.pending || query.status === QueryStatus.rejected)
      );
    });
  });

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const filename = `${generalInformation?.name ?? 'export'}.json`;

    const exportData = new ExportData();
    exportData.averageClusteringCoefficient = averageClusteringCoefficient;
    exportData.connected = connected;
    exportData.degreeAssortativityCoefficient = degreeAssortativityCoefficient;
    exportData.degreeCorrelation = degreeCorrelation;
    exportData.degreeDistribution = degreeDistribution;
    exportData.density = density;
    exportData.diameter = diameter;
    exportData.fullGraph = fullGraph;
    exportData.generalInformation = generalInformation;
    exportData.hasCutEdge = hasCutEdge;
    exportData.hasCutVertex = hasCutVertex;
    exportData.robustness = robustness;

    const fileToSave = new Blob([JSON.stringify(exportData)], {
      type: 'application/json',
    });

    saveAs(fileToSave, filename);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<FileDownloadOutlinedIcon />}
      onClick={buttonHandler}
      disabled={isLoading}
    >
      Export
    </Button>
  );
}
