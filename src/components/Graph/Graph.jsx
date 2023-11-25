"use client";
import { Drag } from "@visx/drag";
import { Line } from "@visx/shape";
import { MarkerArrow } from "@visx/marker";
import { Point } from "@visx/point";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { COLORS } from "@/data/icons";

const Graph = ({
  width,
  height,
  vertices,
  setVertices,
  edges,
  selectedVertex,
  setSelectedVertex,
  tool,
  addEdge,
  deleteEdge,
  deleteVertex,
  selectedColor,
  setEdges,
}) => {
  const colorVertex = (id, color) =>
    setVertices({
      ...vertices,
      [id]: { ...vertices[id], color: color },
    });
  const colorEdge = (from, to, color) => {
    setEdges({
      ...edges,
      [from]: edges[from].map((e) =>
        e.to === to ? { ...e, color: color } : e
      ),
    });
  };
  return (
    <div>
      <svg width={width} height={height}>
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
        <rect
          fill="#ffffff"
          width={width}
          height={height}
          rx={14}
          onMouseDown={() => setSelectedVertex(null)}
        />
        {Object.entries(edges).map(([from, data]) =>
          data.map((to, i) => {
            const x1 = vertices[from].x;
            const y1 = vertices[from].y;
            const x2 = vertices[to.to].x;
            const y2 = vertices[to.to].y;
            const length = Math.sqrt(
              (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
            );
            const dx = (x1 - x2) / length;
            const dy = (y1 - y2) / length;
            return (
              <Line
                onMouseEnter={(e) => {
                  if (e.buttons === 1) {
                    if (tool === "eraser") deleteEdge(from, to.to);
                    if (tool === "brush") colorEdge(from, to.to, selectedColor);
                  }
                }}
                key={i}
                from={
                  new Point({
                    x: x1 - dx * (vertices[from].radius + 2),
                    y: y1 - dy * (vertices[from].radius + 2),
                  })
                }
                to={
                  new Point({
                    x: x2 + dx * (vertices[from].radius + 2),
                    y: y2 + dy * (vertices[from].radius + 2),
                  })
                }
                strokeWidth={3}
                stroke={
                  to.color === "white" ? "black" : COLORS[to.color].textColor
                }
                shapeRendering="geometricPrecision"
                markerEnd={`url(#marker-arrow-${to.color})`}
              />
            );
          })
        )}
        {Object.entries(vertices).map(([id, d]) => (
          <Drag
            key={id}
            width={width}
            height={height}
            x={d.x}
            y={d.y}
            onDragStart={() => {
              if (selectedVertex === id) {
                setSelectedVertex(null);
                return;
              }
              if (tool === "pen" && selectedVertex) {
                addEdge(selectedVertex, id, selectedColor);
              }
              setSelectedVertex(id);
            }}
            onDragMove={(e) => {
              setVertices({
                ...vertices,
                [id]: {
                  ...vertices[id],
                  x: d.x + e.dx,
                  y: d.y + e.dy,
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
                  strokeWidth={isDragging || selectedVertex === id ? 4 : 2}
                  onMouseMove={(e) => {
                    if (e.buttons === 1)
                      if (tool === "brush") colorVertex(id, selectedColor);
                  }}
                  onMouseDown={() => {
                    if (tool === "brush") colorVertex(id, selectedColor);
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
      </svg>
    </div>
  );
};

export default Graph;
