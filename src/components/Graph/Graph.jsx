"use client";
import { Drag } from "@visx/drag";
import { LinePath } from "@visx/shape";
import { MarkerArrow } from "@visx/marker";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { COLORS } from "@/data/colors";
import {
  addEdge,
  setEdgeColor,
  deleteEdge,
  getOneWayUndirectedEdge,
  setVertexColor,
  setSelectedVertex,
  setSelectedEdge,
  deleteVertex,
} from "@/util/editor/graphFunctions";
import { curveCatmullRom } from "@visx/curve";

const Graph = ({ width, height, setData, data, editable }) => {
  return (
    <div>
      <svg width={width} height={height} id="graphsvg">
        <rect
          fill="#ffffff"
          width={width}
          height={height}
          rx={14}
          onMouseDown={() => {
            setData({ ...data, selectedVertex: null, selectedEdge: null });
          }}
        />
        {data.directed && (
          <>
            <MarkerArrow id="marker-arrow-white" fill="black" size={4} />
            <MarkerArrow
              id="marker-arrow-teal"
              fill={COLORS["teal"].textColor}
              size={4}
            />
            <MarkerArrow
              id="marker-arrow-pink"
              fill={COLORS["pink"].textColor}
              size={4}
            />
            <MarkerArrow
              id="marker-arrow-purple"
              fill={COLORS["purple"].textColor}
              size={4}
            />
            <MarkerArrow
              id="marker-arrow-yellow"
              fill={COLORS["yellow"].textColor}
              size={4}
            />
            <MarkerArrow
              id="marker-arrow-orange"
              fill={COLORS["orange"].textColor}
              size={4}
            />
          </>
        )}
        {Object.entries(data.edges).map(([from, destinations]) =>
          destinations.map((to, i) => {
            const x1 = data.vertices[from].x;
            const y1 = data.vertices[from].y;
            const x2 = data.vertices[to.to].x;
            const y2 = data.vertices[to.to].y;
            const length = Math.sqrt(
              (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
            );
            const dx = (x1 - x2) / length;
            const dy = (y1 - y2) / length;
            const fromX = x1 - dx * (data.vertices[from].radius + 2);
            const fromY = y1 - dy * (data.vertices[from].radius + 2);
            const toX = x2 + dx * (data.vertices[from].radius + 2);
            const toY = y2 + dy * (data.vertices[from].radius + 2);
            return (
              <>
                <LinePath
                  markerEnd={`url(#marker-arrow-${to.color})`}
                  onMouseDown={(e) => {
                    setSelectedEdge(data, setData, { from: from, to: to.to });
                  }}
                  onMouseEnter={(e) => {
                    if (e.buttons === 1 && editable) {
                      if (data.tool === "eraser")
                        deleteEdge(data, setData, from, to.to);
                      if (data.tool === "brush")
                        setEdgeColor(
                          data,
                          setData,
                          from,
                          to.to,
                          data.selectedColor
                        );
                    }
                  }}
                  key={i}
                  curve={curveCatmullRom}
                  data={
                    data.directed &&
                    data.edges[to.to]?.some((vertex) => vertex.to === from)
                      ? [
                          { x: fromX, y: fromY },
                          {
                            x: (x1 + x2) / 2 + (length / 25) * dy,
                            y: (y1 + y2) / 2 + -(length / 25) * dx,
                          },
                          { x: toX, y: toY },
                        ]
                      : [
                          { x: fromX, y: fromY },
                          { x: toX, y: toY },
                        ]
                  }
                  x={(d) => d.x}
                  y={(d) => d.y}
                  strokeWidth={
                    data.selectedEdge &&
                    data.selectedEdge.from === from &&
                    data.selectedEdge.to === to.to
                      ? 6
                      : 3
                  }
                  stroke={
                    to.color === "white" ? "black" : COLORS[to.color].textColor
                  }
                />
              </>
            );
          })
        )}
        {Object.entries(data.vertices).map(([id, d]) => (
          <Drag
            key={id}
            width={width}
            height={height}
            x={d.x}
            y={d.y}
            onDragStart={() => {
              if (!editable) return;
              setSelectedVertex(data, setData, id);
              if (data.tool === "pen" && data.selectedVertex && editable) {
                addEdge(
                  data,
                  setData,
                  data.selectedVertex,
                  id,
                  data.selectedColor,
                  1,
                  data.directed
                );
              }
            }}
            onDragMove={(e) => {
              if (!editable) return;
              setData({
                ...data,
                vertices: {
                  ...data.vertices,
                  [id]: {
                    ...data.vertices[id],
                    x: d.x + e.dx,
                    y: d.y + e.dy,
                  },
                },
              });
            }}
          >
            {({ dragStart, dragEnd, dragMove, isDragging }) => (
              <Group
                onMouseMove={dragMove}
                onMouseUp={dragEnd}
                onMouseDown={dragStart}
              >
                <circle
                  cx={d.x}
                  cy={d.y}
                  key={`circle-${id}`}
                  r={d.radius}
                  fill={d.color === "white" ? "white" : COLORS[d.color].bgColor}
                  fillOpacity={0.8}
                  stroke={
                    d.color === "white" ? "black" : COLORS[d.color].textColor
                  }
                  strokeWidth={isDragging || data.selectedVertex === id ? 4 : 2}
                  onMouseMove={(e) => {
                    if (e.buttons === 1 && editable) {
                      if (data.tool === "brush")
                        setVertexColor(data, setData, id, data.selectedColor);
                      if (data.tool === "eraser")
                        deleteVertex(data, setData, id);
                    }
                  }}
                  onMouseDown={() => {
                    if (data.tool === "brush")
                      setVertexColor(data, setData, id, data.selectedColor);
                    if (data.tool === "eraser") deleteVertex(data, setData, id);
                  }}
                />
                <Text
                  key={`text-${id}`}
                  style={{
                    fontWeight: 600,
                    fontSize: "25px",
                    WebkitUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                  }}
                  fill={
                    d.color === "white" ? "black" : COLORS[d.color].textColor
                  }
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={d.x}
                  y={d.y}
                >
                  {d.value}
                </Text>
              </Group>
            )}
          </Drag>
        ))}
        {Object.entries(
          data.directed ? data.edges : getOneWayUndirectedEdge(data)
        ).map(([from, edge]) =>
          edge.map((to, i) => {
            const x1 = data.vertices[from].x;
            const y1 = data.vertices[from].y;
            const x2 = data.vertices[to.to].x;
            const y2 = data.vertices[to.to].y;
            const length = Math.sqrt(
              (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
            );
            const dx = (x1 - x2) / length;
            const dy = (y1 - y2) / length;
            return (
              <>
                {data.weighted && (
                  <Text
                    onMouseDown={(e) => {
                      setSelectedEdge(data, setData, { from: from, to: to.to });
                    }}
                    x={(x1 + x2) / 2 + (length / 25) * dy}
                    y={(y1 + y2) / 2 + -(length / 25) * dx}
                    style={{
                      fontWeight: 600,
                      fontSize: "25px",
                      WebkitUserSelect: "none",
                      msUserSelect: "none",
                      userSelect: "none",
                      textShadow:
                        "2px 0px 0px white,0px 2px 0px white,-2px 0px 0px white,0px -2px 0px white,-2px -2px 0px white,2px 2px 0px white",
                    }}
                    fill={
                      to.color === "white"
                        ? "black"
                        : COLORS[to.color].textColor
                    }
                    textAnchor="start"
                    verticalAnchor="middle"
                  >
                    {to.weight}
                  </Text>
                )}
              </>
            );
          })
        )}
      </svg>
    </div>
  );
};

export default Graph;
