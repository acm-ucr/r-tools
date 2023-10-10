"use client";
import { Bar } from "@visx/shape";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { COLORS } from "@/data/icons";
import { useMemo } from "react";

const verticalMargin = 120;

const BarChart = ({ width, height, data }) => {
  const max = useMemo(() =>
    Math.max.apply(
      null,
      data.map((d) => d.number),
      [data]
    )
  );
  return (
    <svg width={width} height={height}>
      <Group top={verticalMargin / 2}>
        {data.map((d, i) => {
          const barWidth = (width / data.length) * 0.9;
          const barHeight = (d.number * height) / max;
          const barX = (i * width) / data.length;
          const barY = height - (height / max) * d.number;
          return (
            <>
              <Text
                x={barX + barWidth / 2}
                y={barY - 5}
                fill={Object.values(COLORS)[i % 5].textColor}
                textAnchor="middle"
              >
                {d.number}
              </Text>
              <Bar
                className="text-white duration-300"
                key={i}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={
                  d.highlight
                    ? Object.values(COLORS)[i % 5].textColor
                    : Object.values(COLORS)[i % 5].bgColor
                }
              />
            </>
          );
        })}
      </Group>
    </svg>
  );
};
export default BarChart;
