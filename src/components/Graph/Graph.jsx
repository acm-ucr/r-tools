"use client";
import { Drag } from "@visx/drag";
import { Line } from "@visx/shape";
import { MarkerArrow } from "@visx/marker";
import { Point } from "@visx/point";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { COLORS } from "@/data/icons";

const Graph = ({ width, height, vertices, setVertices, edges }) => {
  return (
    <div className="Drag" style={{ touchAction: "none" }}>
      <svg width={width} height={height}>
        <MarkerArrow id="marker-arrow" fill="black" size={6} />
        <rect fill="#ffffff" width={width} height={height} rx={14} />
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
                stroke={to.color ? COLORS[to.color].textColor : "black"}
                shapeRendering="geometricPrecision"
                markerEnd="url(#marker-arrow)"
              />
            );
          })
        )}
        {Object.entries(vertices).map(([i, d]) => (
          <Drag
            key={`drag-${i}`}
            width={width}
            height={height}
            x={d.x}
            y={d.y}
            onDragMove={(e) => {
              setVertices({
                ...vertices,
                [i]: {
                  ...vertices[i],
                  x: d.x + e.dx,
                  y: d.y + e.dy,
                },
              });
            }}
          >
            {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
              <Group
                cx={x}
                cy={y}
                onMouseMove={dragMove}
                onMouseUp={dragEnd}
                onMouseDown={dragStart}
                onTouchStart={dragStart}
                onTouchMove={dragMove}
                onTouchEnd={dragEnd}
              >
                <circle
                  cx={x}
                  cy={y}
                  key={`dot-${i}`}
                  r={d.radius}
                  fill={d.color ? COLORS[d.color].bgColor : "white"}
                  fillOpacity={0.8}
                  stroke={d.color ? COLORS[d.color].textColor : "black"}
                  strokeWidth={isDragging ? 4 : 2}
                />
                <Text
                  key={i}
                  style={{
                    fontWeight: 600,
                    fontSize: "25px",
                    WebkitUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                  }}
                  fill={d.color ? COLORS[d.color].textColor : "black"}
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
