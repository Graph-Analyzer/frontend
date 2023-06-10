import React, { useEffect, useState } from 'react';
import '@react-sigma/core/lib/react-sigma.min.css';
import { DirectedGraph } from 'graphology';
import {
  ControlsContainer,
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  useSetSettings,
  useSigma,
  ZoomControl,
} from '@react-sigma/core';
import { Attributes } from 'graphology-types';
import { Graph, Node } from '../api/graphGeneratorApi';

interface GraphProps {
  data: Graph;
}

export default function PreviewGraph({ data }: GraphProps) {
  const getNodeColor = (node: Node) => {
    if (node.attributes.node_type === 'core') {
      return '#e91e63';
    } else if (node.attributes.node_type === 'core_random') {
      return '#ff9800';
    } else if (node.node_id.includes('level1')) {
      return '#4caf50';
    } else if (node.node_id.includes('level2')) {
      return '#2196f3';
    } else {
      return '#ffeb3b';
    }
  };

  const Graph = () => {
    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const loadGraph = useLoadGraph();
    const setSettings = useSetSettings();
    const [focusedNode, setFocusedNode] = useState<string | null>(null);

    useEffect(() => {
      const graph = new DirectedGraph();

      const nodes = data.nodes;
      const edges = data.edges;
      nodes?.map((value) => {
        graph.addNode(value.node_id, {
          label: value.node_id,
          size: Math.min(10, value.attributes.coordinate_y) + 5,
          color: getNodeColor(value),
          x: value.attributes.coordinate_x,
          y: value.attributes.coordinate_y,
        });
      });

      edges?.map((value) => {
        graph.addEdgeWithKey(
          value.node_from + value.node_to,
          value.node_from,
          value.node_to,
          { label: value.attributes.weight }
        );
      });

      loadGraph(graph);

      registerEvents({
        clickNode: (event) => setFocusedNode(event.node),
        clickStage: () => setFocusedNode(null),
      });
    }, [loadGraph, data]);

    useEffect(() => {
      setSettings({
        nodeReducer: (node, data) => {
          const graph = sigma.getGraph();
          const newData: Attributes = { ...data, highlighted: data.highlighted || false };

          if (focusedNode) {
            if (node === focusedNode || graph.neighbors(focusedNode).includes(node)) {
              newData.highlighted = true;
            } else {
              newData.color = '#E2E2E2';
              newData.highlighted = false;
            }
          }
          return newData;
        },
        edgeReducer: (edge, data) => {
          const graph = sigma.getGraph();
          const newData = { ...data, hidden: false };

          if (focusedNode && !graph.extremities(edge).includes(focusedNode)) {
            newData.hidden = true;
          }
          return newData;
        },
        renderEdgeLabels: true,
      });
    }, [focusedNode, setSettings, sigma]);

    return null;
  };

  return (
    <SigmaContainer>
      <Graph />
      <ControlsContainer position={'bottom-right'}>
        <ZoomControl />
      </ControlsContainer>
    </SigmaContainer>
  );
}
