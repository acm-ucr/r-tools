import { HiArrowLongRight } from "react-icons/hi2";
import { TbCircleFilled } from "react-icons/tb";
import { BsDashLg } from "react-icons/bs";
import { COLORS } from "@/data/colors";

const EdgeEntry = ({ data, setData, from, to, directed, weighted }) => {
  return (
    <div
      className={`flex items-center my-1 cursor-pointer px-2 rounded py-1 w-full ${
        data.selectedEdge &&
        from === data.selectedEdge.from &&
        to.to === data.selectedEdge.to &&
        "bg-rtools-blue-200"
      }`}
      onClick={() =>
        setData({ ...data, selectedEdge: { from: from, to: to.to } })
      }
    >
      <span
        className={`${
          data.vertices[from].color === "white"
            ? "text-white"
            : COLORS[data.vertices[from].color].text
        } flex items-center`}
      >
        <TbCircleFilled className="text-xs mr-1" />
        {data.vertices[from].value}
      </span>
      {directed ? (
        <HiArrowLongRight
          className={`text-xl p-1 mx-2 ${
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
          data.vertices[to.to].color === "white"
            ? "text-white"
            : COLORS[data.vertices[to.to].color].text
        } flex items-center`}
      >
        <TbCircleFilled className="text-xs mr-1" />
        {data.vertices[to.to].value}
      </span>
      {weighted &&
        (data.selectedEdge &&
        from === data.selectedEdge.from &&
        to.to === data.selectedEdge.to ? (
          <input
            type="number"
            value={to.weight}
            className="ml-2 bg-white/30 rounded px-2 w-full border-0"
            onChange={(e) =>
              setData({
                ...data,
                edges: {
                  ...data.edges,
                  [from]: data.edges[from].map((edge) => {
                    if (edge.to === to.to)
                      return {
                        ...to,
                        weight: parseInt(e.target.value),
                      };
                    return edge;
                  }),
                },
              })
            }
          />
        ) : (
          <span className="font-bold ml-2"> {to.weight}</span>
        ))}
    </div>
  );
};

export default EdgeEntry;
