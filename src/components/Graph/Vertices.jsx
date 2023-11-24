import { COLORS } from "@/data/icons";
import { useState } from "react";

const Vertices = ({ vertices, edges }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex-grow bg-rtools-blue-300 rounded-xl py-2 px-3">
      <div className="flex justify-between">
        <div>vertices</div>
        <div>
          <span className="text-sm text-rtools-blue-100 mr-1">count</span>
          <span className="font-bold text-sm">
            {Object.keys(vertices).length}
          </span>
        </div>
      </div>
      {Object.entries(vertices).map(([i, d]) => (
        <div
          key={`vertex-${i}`}
          onClick={() => setSelected(selected === i ? null : i)}
          className={`${
            selected === i && "bg-rtools-blue-200"
          } my-2 hover:bg-rtools-blue-200 w-full py-1 px-2 rounded cursor-pointer duration-200`}
        >
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                d.color ? COLORS[d.color].bgDark : "bg-white"
              } mr-2`}
            />
            <div className="">{vertices[i].value}</div>
            <div className="text-sm">{d.label}</div>
          </div>
          {selected === i &&
            (edges[i] ? (
              edges[i].map((to, index) => (
                <div
                  key={index}
                  className="flex items-center ml-4"
                  onClick={() => setSelected(i)}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      vertices[to.to].color
                        ? COLORS[vertices[to.to].color].bgDark
                        : "bg-white"
                    } mr-2`}
                  />
                  <div className="">{vertices[to.to].value}</div>
                </div>
              ))
            ) : (
              <div className="ml-4">no edges </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Vertices;
