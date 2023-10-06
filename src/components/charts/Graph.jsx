"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Graph = () => {
  const ref = useRef();
  const width = 700;
  const height = 700;
  const data = [
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" },
    { name: "F" },
    { name: "G" },
    { name: "H" },
  ];

  const simulation = d3
    .forceSimulation()
    .force(
      "center",
      d3
        .forceCenter()
        .x(width / 2)
        .y(height / 2)
    )
    .force("collide", d3.forceCollide().strength(0.1).radius(30).iterations(1));
  const dragstarted = (event, d) => {
    if (!event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  };
  const dragged = (event, d) => {
    d.fx = event.x;
    d.fy = event.y;
  };
  const dragended = (event, d) => {
    if (!event.active) simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  };
  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const node = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 25)
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", "white")
      .attr("stroke", "#b3a2c8")
      .style("stroke-width", 4)

      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
    simulation
      .nodes(data)
      .on("tick", (d) => node.attr("cx", (d) => d.x).attr("cy", (d) => d.y));
  });
  return <svg ref={ref} />;
};

export default Graph;
