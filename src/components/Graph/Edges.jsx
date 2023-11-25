import { COLORS } from "@/data/icons";
import { useMemo } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { TbCircleFilled } from "react-icons/tb";

const Edges = ({ vertices, edges }) => {
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
            <div key={index} className="flex items-center my-2">
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
              <HiArrowLongRight
                className={`text-xl mx-2 ${
                  vertices[to.to].color !== "white" &&
                  COLORS[vertices[to.to].color].text
                }`}
              />
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Edges;
