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
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { useGetGraphPropertyFullGraphQuery } from '../api/graphAnalyzerApi';
import { Attributes } from 'graphology-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectNetworkGraph, updateNetworkGraphData } from './networkGraphSlice';
import { checkIsOffline } from '../nav/navBarSlice';

export default function NetworkGraph() {
  const dispatch = useAppDispatch();

  const Graph = () => {
    const sigma = useSigma();
    const { start: startForceAtlas2, stop: stopForceAtlas2 } = useWorkerLayoutForceAtlas2(
      {
        settings: {
          slowDown: 1,
          barnesHutOptimize: true,
          linLogMode: true,
        },
      }
    );
    const registerEvents = useRegisterEvents();
    const loadGraph = useLoadGraph();
    const setSettings = useSetSettings();
    const [focusedNode, setFocusedNode] = useState<string | null>(null);
    const {
      data: graphData,
      isSuccess,
      isFetching,
    } = useGetGraphPropertyFullGraphQuery();

    useEffect(() => {
      if (isSuccess) {
        dispatch(updateNetworkGraphData(graphData));
      }
    }, [isFetching, isSuccess]);

    const data = useAppSelector(selectNetworkGraph);
    const isOffline = useAppSelector(checkIsOffline);

    const loaded = undefined !== data && (isOffline || isSuccess);

    const nodeCount = data?.nodes.length ?? null;

    useEffect(() => {
      if (nodeCount !== null) {
        // start worker
        startForceAtlas2();

        const timeoutInMs = Math.max(3000, nodeCount * 5);

        // stop worker after timeout due to performance reasons
        let stopAfterTimeoutTimer = setTimeout(() => {
          stopForceAtlas2();
        }, timeoutInMs);

        return () => {
          // Stop worker on unmount
          clearTimeout(stopAfterTimeoutTimer);
          stopForceAtlas2();
        };
      }
    }, [loadGraph, nodeCount, startForceAtlas2, stopForceAtlas2]);

    useEffect(() => {
      const graph = new DirectedGraph();

      if (loaded) {
        const nodes = data.nodes;
        const edges = data.edges;
        nodes.map((value) => {
          graph.addNode(value.id, {
            label: value.label,
            size: Math.min(10, value.size) + 5,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // random color
            x: Math.random(),
            y: Math.random(),
          });
        });

        edges.map((value) => {
          graph.addEdgeWithKey(value.id, value.from, value.to);
        });
      }

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
