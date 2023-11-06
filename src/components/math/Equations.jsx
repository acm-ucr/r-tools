"use client";
import { useState } from "react";
import {AiOutlineClose} from 'react-icons/ai';

const Equations = ({ equations, setEquations }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function removeEquation(index) {
    const newEquations = equations;
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
                <AiOutlineClose
                  className="justify-self-end text-slate-400 hover:text-white"
                  onClick={()=>removeEquation(index)}
                >
                  x
                </AiOutlineClose>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equations;
