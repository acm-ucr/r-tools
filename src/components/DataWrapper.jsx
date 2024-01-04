"use client";
import DataContext from "./DataContext";
import { useState } from "react";

const DataWrapper = ({ children }) => {
  const [data, setData] = useState({
    vertices: {},
    edges: {},
    selectedVertex: null,
    selectedEdge: null,
    selectedColor: null,
    input: "",
    tool: "cursor",
  });
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataWrapper;
