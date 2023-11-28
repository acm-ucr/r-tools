import { COLORS } from "@/data/icons";
import { useMemo } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { TbCircleFilled } from "react-icons/tb";
import { BsDashLg } from "react-icons/bs";

const Edges = ({
  vertices,
  edges,
  setEdges,
  directed,
  selectedEdge,
  setSelectedEdge,
  weighted,
}) => {
  const count = useMemo(() => {
    let count = 0;
    Object.values(edges).forEach((vertex) => (count += vertex.length));
    return count;
  }, [edges]);
  return (
    <div className="h-[60vh] bg-rtools-blue-300 rounded-xl py-2 flex flex-col">
      <div className="flex justify-between px-3">
        <div>edges</div>
        <div>
          <span className="text-sm text-rtools-blue-100 mr-1">count</span>
          <span className="font-bold text-sm">{count}</span>
        </div>
      </div>
      <div className="overflow-y-scroll px-3">
        {Object.entries(edges).map(([i, d]) =>
          d.map((to, index) => (
            <div
              key={index}
              className={`flex items-center my-1 cursor-pointer px-2 rounded py-1 ${
                selectedEdge &&
                i === selectedEdge.from &&
                to.to === selectedEdge.to &&
                "bg-rtools-blue-200"
              }`}
              onClick={() => setSelectedEdge({ from: i, to: to.to })}
            >
              <span
                className={`${
                  vertices[i].color === "white"
                    ? "text-white"
                    : COLORS[vertices[i].color].text
                } flex items-center`}
              >
                <TbCircleFilled className="text-xs mr-1" />
                {vertices[i].value}
              </span>
              {directed ? (
                <HiArrowLongRight
                  className={`text-xl mx-2 ${
                    to.color !== "white" && COLORS[to.color].text
                  }`}
                />
              ) : (
                <BsDashLg
                  className={`text-xl mx-2 ${
                    to.color !== "white" && COLORS[to.color].text
                  }`}
                />
              )}
              <span
                className={`${
                  vertices[to.to].color === "white"
                    ? "text-white"
                    : COLORS[vertices[to.to].color].text
                } flex items-center`}
              >
                <TbCircleFilled className="text-xs mr-1" />
                {vertices[to.to].value}
              </span>
              {weighted &&
                (selectedEdge &&
                i === selectedEdge.from &&
                to.to === selectedEdge.to ? (
                  <input
                    type="number"
                    value={to.weight}
                    className="ml-2 bg-white/30 rounded px-2"
                    onChange={(e) =>
                      setEdges({
                        ...edges,
                        [i]: edges[i].map((edge) => {
                          if (edge.to === to.to)
                            return { ...to, weight: parseInt(e.target.value) };
                          return edge;
                        }),
                      })
                    }
                  />
                ) : (
                  <span className="font-bold ml-2"> {to.weight}</span>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Edges;
