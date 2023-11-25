import { COLORS } from "@/data/icons";

const Vertices = ({
  vertices,
  edges,
  selectedVertex,
  setSelectedVertex,
  tool,
}) => {
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
      {Object.entries(vertices).map(([id, data]) => (
        <div
          key={id}
          onClick={() => setSelectedVertex(selectedVertex === id ? null : id)}
          className={`${
            selectedVertex === id && "bg-rtools-blue-200"
          } my-2 hover:bg-rtools-blue-200 w-full py-1 px-2 rounded cursor-pointer duration-200`}
        >
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                data.color === "white" ? "bg-white" : COLORS[data.color].bgDark
              } mr-2`}
            />
            <div className="">{vertices[id].value}</div>
            <div className="text-sm">{data.label}</div>
          </div>
          {selectedVertex === id &&
            (edges[id] ? (
              edges[id].map((to, index) => (
                <div
                  key={index}
                  className="flex items-center ml-4"
                  onClick={() => setSelectedVertex(i)}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      vertices[to.to].color === "white"
                        ? "bg-white"
                        : COLORS[vertices[to.to].color].bgDark
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
