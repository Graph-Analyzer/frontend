import React, { useEffect } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import {
  TextField,
  Button,
  FormControlLabel,
  List,
  ListItem,
  MenuItem,
  Switch,
  CircularProgress,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import * as Yup from 'yup';
import {
  Generator,
  RandomDistribution,
  Topology,
  useGenerateGeneratePostMutation,
} from '../../api/graphGeneratorApi';
import { useAppDispatch } from '../../../hooks';
import { updateGeneratorData } from '../generatorSlice';
import GeneratorError from './GeneratorError';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const initialValues: Generator = {
  l1_pops: 5,
  l2_pops: 20,
  pop_regions: 5,
  core_node_scaling_threshold: 7,
  random_core_nodes: 2,
  random_core_node_connections: 2,
  random_distribution: 'uniform',
  topology: 'gabriel',
  no_cut_edges_and_nodes: true,
};

const randomDistributionOptions = [
  { value: 'uniform', label: 'Uniform' },
  { value: 'normal', label: 'Normal' },
];

const topologyOptions = [
  { value: 'gabriel', label: 'Gabriel' },
  { value: 'ring', label: 'Ring' },
];

const validationSchema = Yup.object({
  l1_pops: Yup.number()
    .typeError('L1 PoPs must be a number')
    .min(0, 'L1 PoPs cannot be negative')
    .max(10000, 'L1 PoPs cannot exceed 10,000')
    .integer('L1 PoPs must be an integer')
    .required('L1 PoPs is required'),
  l2_pops: Yup.number()
    .typeError('L2 PoPs must be a number')
    .min(0, 'L2 PoPs cannot be negative')
    .max(10000, 'L2 PoPs cannot exceed 10,000')
    .integer('L2 PoPs must be an integer')
    .required('L2 PoPs is required'),
  pop_regions: Yup.number()
    .typeError('PoP regions must be a number')
    .min(1, 'PoP regions must be greater than zero')
    .max(20000, 'PoP region cannot exceed 20,000')
    .integer('PoP regions must be an integer')
    .required('PoP regions is required'),
  core_node_scaling_threshold: Yup.number()
    .typeError('Core node scaling threshold must be a number')
    .min(1, 'Core node scaling threshold must be greater than zero')
    .max(1000, 'Core node scaling threshold cannot exceed 1,000')
    .integer('Core node scaling threshold must be an integer')
    .required('Core node scaling threshold is required'),
  random_core_nodes: Yup.number()
    .typeError('Random core nodes must be a number')
    .min(0, 'Random core nodes cannot be negative')
    .max(10000, 'Random core nodes cannot exceed 10,000')
    .integer('Random core nodes must be an integer')
    .required('Random core nodes is required'),
  random_core_node_connections: Yup.number()
    .typeError('Random core node connections must be a number')
    .min(0, 'Random core node connections cannot be negative')
    .max(10000, 'Random core node connections cannot exceed 10,000')
    .integer('Random core node connections must be an integer')
    .required('Random core node connections is required'),
  random_distribution: Yup.mixed<RandomDistribution>()
    .oneOf(['uniform', 'normal'], 'Random distribution must be "uniform" or "normal"')
    .required('Random distribution is required'),
  topology: Yup.mixed<Topology>()
    .oneOf(['gabriel', 'ring'], 'Topology must be "gabriel" or "ring"')
    .required('Topology is required'),
  no_cut_edges_and_nodes: Yup.bool().required('No cut edges and nodes is required'),
});

export default function GeneratorForm() {
  const dispatch = useAppDispatch();

  const [
    generatorPostRequest,
    { data: generatedGraph, isLoading, isSuccess, error: generatedError },
  ] = useGenerateGeneratePostMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateGeneratorData(generatedGraph));
    }
  }, [isLoading, isSuccess]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateGeneratorData(undefined));
        generatorPostRequest({ generator: values });
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form>
          <p>Generate a new service provider network topology</p>
          <List>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="Number of level 1 point of presences to generate. This kind of PoP is more likely to be used in large areas.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="l1_pops">
                {({ field }: FieldProps<Generator['l1_pops']>) => (
                  <TextField
                    {...field}
                    label="L1 PoPs"
                    variant="outlined"
                    fullWidth
                    error={touched.l1_pops && Boolean(errors.l1_pops)}
                    helperText={touched.l1_pops && errors.l1_pops}
                  />
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="Number of level 2 point of presences to generate. This kind of PoP is more likely to be used in smaller areas.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="l2_pops">
                {({ field }: FieldProps<Generator['l2_pops']>) => (
                  <TextField
                    {...field}
                    label="L2 PoPs"
                    variant="outlined"
                    fullWidth
                    error={touched.l2_pops && Boolean(errors.l2_pops)}
                    helperText={touched.l2_pops && errors.l2_pops}
                  />
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="The number of regions to generate to which PoPs are assigned.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="pop_regions">
                {({ field }: FieldProps<Generator['pop_regions']>) => (
                  <TextField
                    {...field}
                    label="PoP regions"
                    variant="outlined"
                    fullWidth
                    error={touched.pop_regions && Boolean(errors.pop_regions)}
                    helperText={touched.pop_regions && errors.pop_regions}
                  />
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="The core node scaling threshold determines the number of additional core nodes added per region in addition to the default two core nodes. This calculation uses floor division, where the total number of PoPs is divided by the threshold value to determine the number of additional nodes to be added.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="core_node_scaling_threshold">
                {({ field }: FieldProps<Generator['core_node_scaling_threshold']>) => (
                  <TextField
                    {...field}
                    label="Core node scaling threshold"
                    variant="outlined"
                    fullWidth
                    error={
                      touched.core_node_scaling_threshold &&
                      Boolean(errors.core_node_scaling_threshold)
                    }
                    helperText={
                      touched.core_node_scaling_threshold &&
                      errors.core_node_scaling_threshold
                    }
                  />
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="The number of random core nodes that will be added to the network topology.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="random_core_nodes">
                {({ field }: FieldProps<Generator['random_core_nodes']>) => (
                  <TextField
                    {...field}
                    label="Random core nodes"
                    variant="outlined"
                    fullWidth
                    error={touched.random_core_nodes && Boolean(errors.random_core_nodes)}
                    helperText={touched.random_core_nodes && errors.random_core_nodes}
                  />
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="The number of edges between randomly selected core nodes that will be added to the network topology.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="random_core_node_connections">
                {({ field }: FieldProps<Generator['random_core_node_connections']>) => (
                  <TextField
                    {...field}
                    label="Random core node connections"
                    variant="outlined"
                    fullWidth
                    error={
                      touched.random_core_node_connections &&
                      Boolean(errors.random_core_node_connections)
                    }
                    helperText={
                      touched.random_core_node_connections &&
                      errors.random_core_node_connections
                    }
                  />
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="The random distribution that the generation should be based upon.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="random_distribution">
                {({ field }: FieldProps<Generator['random_distribution']>) => (
                  <TextField
                    select
                    {...field}
                    label="Random distribution"
                    variant="outlined"
                    fullWidth
                    error={
                      touched.random_distribution && Boolean(errors.random_distribution)
                    }
                    helperText={touched.random_distribution && errors.random_distribution}
                  >
                    {randomDistributionOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="The topology that the generation should be based upon.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="topology">
                {({ field }: FieldProps<Generator['topology']>) => (
                  <TextField
                    select
                    {...field}
                    label="Topology"
                    variant="outlined"
                    fullWidth
                    error={touched.topology && Boolean(errors.topology)}
                    helperText={touched.topology && errors.topology}
                  >
                    {' '}
                    {topologyOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </ListItem>
            <ListItem>
              <InputAdornment position="start">
                <Tooltip title="Choose if the network topology should be optimized. It mitigates greedy nodes, cut edges and cut nodes.">
                  <InfoOutlinedIcon />
                </Tooltip>
              </InputAdornment>
              <Field name="no_cut_edges_and_nodes">
                {({ field }: FieldProps<Generator['no_cut_edges_and_nodes']>) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Topology optimization"
                    labelPlacement="end"
                  />
                )}
              </Field>
            </ListItem>
            <ListItem>
              {isLoading ? (
                <Button
                  color="primary"
                  disabled
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  <CircularProgress size={20} />
                </Button>
              ) : (
                <Button
                  disabled={!isValid}
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ marginLeft: 4 }}
                >
                  Generate
                </Button>
              )}
            </ListItem>
          </List>
          {generatedError && <GeneratorError error={generatedError}></GeneratorError>}
        </Form>
      )}
    </Formik>
  );
}
