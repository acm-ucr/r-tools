"use client";
import React, { useState } from "react";
import { Drag } from "@visx/drag";
import { VERTICES, EDGES } from "@/mockdata/graphVertex";
import { Line } from "@visx/shape";
import { MarkerArrow } from "@visx/marker";
import { Point } from "@visx/point";
import { Text } from "@visx/text";
import { Group } from "@visx/group";

const Graph = ({ width, height }) => {
  const [draggingItems, setDraggingItems] = useState(VERTICES);

  return (
    <div className="Drag" style={{ touchAction: "none" }}>
      <svg width={width} height={height}>
        <MarkerArrow id="marker-arrow" fill="black" size={6} />
        <rect fill="#ffffff" width={width} height={height} rx={14} />
        {Object.entries(EDGES).map(([from, vertices]) =>
          vertices.map((to, i) => {
            const x1 = draggingItems[from].x;
            const y1 = draggingItems[from].y;
            const x2 = draggingItems[to].x;
            const y2 = draggingItems[to].y;
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
                    x: x1 - dx * (draggingItems[from].radius + 2),
                    y: y1 - dy * (draggingItems[from].radius + 2),
                  })
                }
                to={
                  new Point({
                    x: x2 + dx * (draggingItems[from].radius + 2),
                    y: y2 + dy * (draggingItems[from].radius + 2),
                  })
                }
                strokeWidth={2}
                stroke="black"
                shapeRendering="geometricPrecision"
                markerEnd="url(#marker-arrow)"
              />
            );
          })
        )}
        {Object.entries(draggingItems).map(([i, d]) => (
          <Drag
            key={`drag-${i}`}
            width={width}
            height={height}
            x={d.x}
            y={d.y}
            onDragMove={(e) => {
              setDraggingItems({
                ...draggingItems,
                [i]: {
                  ...draggingItems[i],
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
                  fill="white"
                  fillOpacity={0.8}
                  stroke="black"
                  strokeWidth={isDragging ? 2 : 1.5}
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
                  fill="black"
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={d.x}
                  y={d.y}
                >
                  {i}
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
