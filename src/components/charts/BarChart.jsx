"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { COLORS } from "@/data/icons";

const BarChart = ({ data }) => {
  const ref = useRef();
  const width = 700;
  const height = 300;
  const textHeight = 20;
  useEffect(() => {
    const max = Math.max.apply(null, data);
    console.log(max);
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .transition()
      .duration(500)
      .attr("x", (d, i) => (i * width) / data.length)
      .attr("y", (d, i) => height - ((height - textHeight) / max) * d)
      .attr("width", (width / data.length) * 0.9)
      .attr("height", (d, i) => (d * (height - textHeight)) / max)
      .attr("fill", (d, i) => Object.values(COLORS)[i % 5].bgColor);
    svg
      .selectAll("text")
      .data(data)
      .join("text")
      .transition()
      .duration(500)
      .text((d) => d)
      .attr(
        "x",
        (d, i) => (i * width) / data.length + (width / data.length) * 0.4
      )
      .attr("y", (d, i) => height - ((height - textHeight) / max) * d - 5)
      .attr("fill", (d, i) => Object.values(COLORS)[i % 5].textColor);
  }, [data]);
  return <svg ref={ref} />;
};

export default BarChart;
