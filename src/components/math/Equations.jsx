"use client";
import { useState } from "react";

const Equations = ({ equations, setEquations }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function removeEquation(index) {
    let newEquations = equations;
    newEquations.splice(index, 1);
    setEquations(newEquations);
  }

  return (
    <div className="w-64">
      <div className="flex-row grid bg-blue-300/10 rounded-2xl">
        <div className="mx-4 divide-y-2 divide-blue-100">
          {Object.entries(equations).map(([equation, value], index) => (
            <div
              key={index}
              className="grid my-2 justify-between grid-cols-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div>{value}</div>
              {hoveredIndex === index && (
                <div
                  className="justify-self-end text-slate-400 hover:text-white"
                  onClick={removeEquation(index)}
                >
                  x
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equations;
