"use client";
import { Bar } from "@visx/shape";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import { COLORS } from "@/data/colors";
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
          const barHeight = height;
          const barX = (i * width) / data.length;
          let barY = 0;

          barY = Math.min(
            height - (height * d.number) / max,
            height - height * 0.14
          );

          return (
            <>
              <Text
                x={barX + barWidth / 2}
                y={barY - 5}
                fill={Object.values(COLORS)[i % 5].textColor}
                textAnchor="middle"
                className="font-bold"
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
              {d.highlight && (
                <Text
                  x={barX + barWidth / 2}
                  y={barY - 40}
                  fill={Object.values(COLORS)[i % 5].textColor}
                  textAnchor="middle"
                  className="font-bold"
                >
                  {d.highlight}
                </Text>
              )}
            </>
          );
        })}
      </Group>
    </svg>
  );
};
export default BarChart;
