"use client"

import { useCallback, useState, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ConnectionLineType,
  type ColorMode,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
]

const initialEdges: Edge[] = [{ id: "1-2", source: "1", target: "2" }]

function subscribeNoop() {
  return () => {}
}

function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )
}

export function Canvas() {
  const mounted = useMounted()
  const { resolvedTheme } = useTheme()
  const colorMode: ColorMode = mounted
    ? ((resolvedTheme as ColorMode) ?? "light")
    : "light"
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((current) => applyNodeChanges(changes, current)),
    []
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((current) => applyEdgeChanges(changes, current)),
    []
  )

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((current) => addEdge(connection, current)),
    []
  )

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)" },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
          } as React.CSSProperties
        }
        maxZoom={1}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
