/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';


// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements, direction = 'LR') => {

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranker: 'tight-tree', acyclicer: 'greedy', ranksep: 50, marginx: 100, marginy: 100 });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);

      if(el.id == 0) {
        el.targetPosition = isHorizontal ? 'bottom' : 'bottom';
        el.sourcePosition = isHorizontal ? 'bottom' : 'bottom';
      } else {
        el.targetPosition = isHorizontal ? 'right' : 'left';
        el.sourcePosition = isHorizontal ? 'left' : 'right';

      }

      // unfortunately we need this little hack to pass a slighltiy different position
      // to notify react flow about the change. More over we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      if(isHorizontal) {
        el.position = {
          x: (nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000) + 750,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      } else {
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }
    }

    return el;
  });
};


const LayoutFlow = (props) => {
  var r = props.markdown.split('\n')
  var stacks = [[0], [0]]

  var nodes = [
    [{
      id: '' + 0 + '',
      type: 'input',
      data: { label: r[0].replace("#", "").replace("#", "").replace("#", "") },
      position: { x: 0, y: 0 },
    }],
    [{
      id: '' + 0 + '',
      type: 'input',
      data: { label: r[0].replace("#", "").replace("#", "").replace("#", "") },
      position: { x: 0, y: 0 },
    }],
  ]
  var edges = [[], []]

  var stackNum = 0

  for (var i = 1; i < r.length; i++) {

    var numHashes = (r[i].match(/#/g) || []).length

    if(numHashes == 0) {

    } else {

      if(numHashes == 2) {
        if(stackNum == 0){
          stackNum = 1
        } else {
          stackNum = 0
        }
      }

      // console.log(numHashes, stackNum)

      nodes[stackNum].push({
        id: '' + i + '',
        type: 'input',
        data: { label: r[i].replace("#", "").replace("#", "").replace("#", "") },
        position: { x: 0, y: 0 },
      })

      if(numHashes <= stacks[stackNum].length) {
        var c = (stacks[stackNum].length - numHashes) + 1
        var f;
        for (f = 0; f < c; f++) {
          stacks[stackNum].pop()
        }
      }
      stacks[stackNum].push(i)
      edges[stackNum].push(
        {
          id: 'e' + stacks[stackNum][stacks[stackNum].length-2] + '-' + stacks[stackNum][stacks[stackNum].length-1],
          source: '' + stacks[stackNum][stacks[stackNum].length-2] + '',
          target: '' + stacks[stackNum][stacks[stackNum].length-1] + ''
        }
      )
    }
    //Do something
  }



  // console.log(nodes)
  // console.log(edges)

  const elements_1 = getLayoutedElements(nodes[0].concat(edges[0]), "LR")


  const elements_2 = getLayoutedElements(nodes[1].concat(edges[1]), "RL")

  elements_2.shift()
  const elements = elements_1.concat(elements_2)
  // const elements = elements_2

  // const elements = elements_1

  // console.log(elements_1)
  console.log(elements)


  const onConnect = (params) =>
    setElements((els) =>// XXX:
      addEdge({ ...params, animated: true }, els)
    );
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));


  return (
    <div style={{ height: 1000 }}>
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          // onConnect={onConnect}
          // onElementsRemove={onElementsRemove}
          connectionLineType="straight"
        />
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
