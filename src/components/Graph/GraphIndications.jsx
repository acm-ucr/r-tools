import React from "react";
import ColorKey from "./ColorKey";

const GraphIndications = ({ directed, weighted, colorkeys }) => {
  return (
    <>
      <div className="flex justify-start items-center m-2">
        <div
          className={`h-4 w-4 rounded-full ${
            directed ? "bg-rtools-green" : "bg-gray-300 opacity-30"
          }`}
        ></div>
        <span className={`ml-2 mr-4 ${directed ? "" : "opacity-30"}`}>
          Directed
        </span>
        <div
          className={`h-4 w-4 rounded-full ${
            weighted ? "bg-rtools-green" : "bg-gray-300 opacity-30"
          }`}
        ></div>
        <span className={`ml-2 mr-4 ${weighted ? "" : "opacity-30"}`}>
          Weighted
        </span>
      </div>
      {colorkeys && (
        <div className="flex gap-3">
          {Object.entries(colorkeys).map(([text, color], index) => (
            <ColorKey color={color} text={text} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default GraphIndications;
